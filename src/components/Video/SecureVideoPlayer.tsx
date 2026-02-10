import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Shield, AlertCircle } from 'lucide-react';
import { apiClient } from '../../services/api';

interface SecureVideoPlayerProps {
  lessonId: string;
  courseId: string;
  videoUrl?: string;
  title: string;
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export default function SecureVideoPlayer({
  lessonId,
  courseId,
  videoUrl,
  onProgress,
  onComplete,
}: SecureVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [secureToken, setSecureToken] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState('');

  // Security: Prevent right-click context menu
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent common download shortcuts
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === 's' || e.key === 'S' || e.key === 'u' || e.key === 'U')
      ) {
        e.preventDefault();
        return false;
      }
      // Prevent F12 (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
    };

    // Prevent drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Prevent text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('selectstart', handleSelectStart);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  // Security: Detect screen recording attempts
  useEffect(() => {
    const detectScreenRecording = () => {
      // Check for common screen recording indicators
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Try to detect screen recording by checking canvas fingerprinting
        try {
          ctx.fillText('Screen Recording Detection', 0, 0);
          const imageData = ctx.getImageData(0, 0, 1, 1);
          
          // If canvas is being captured, it might indicate screen recording
          if (imageData.data[3] === 0) {
            console.warn('Potential screen recording detected');
            // You can implement additional logic here, like pausing video or showing warning
          }
        } catch (e) {
          // Cross-origin restrictions
        }
      }

      // Detect if DevTools is open (indicator of potential recording)
      let devtools = { open: false, orientation: null as any };
      const threshold = 160;
      setInterval(() => {
        if (
          window.outerHeight - window.innerHeight > threshold ||
          window.outerWidth - window.innerWidth > threshold
        ) {
          if (!devtools.open) {
            devtools.open = true;
            handleSecurityViolation('DevTools detected');
          }
        } else {
          devtools.open = false;
        }
      }, 500);
    };

    detectScreenRecording();
  }, []);

  // Security: Detect if video is being captured
  useEffect(() => {
    if (!videoRef.current) return;

    const handleVisibilityChange = () => {
      if (document.hidden && isPlaying) {
        // Video paused when tab is hidden - might indicate screen recording
        console.warn('Tab hidden while video playing');
      }
    };

    // Monitor for canvas capture attempts
    const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
    CanvasRenderingContext2D.prototype.getImageData = function (...args) {
      if (videoRef.current && this.canvas) {
        const rect = videoRef.current.getBoundingClientRect();
        const canvasRect = this.canvas.getBoundingClientRect();
        
        // Check if canvas is capturing video area
        if (
          canvasRect.left >= rect.left &&
          canvasRect.top >= rect.top &&
          canvasRect.right <= rect.right &&
          canvasRect.bottom <= rect.bottom
        ) {
          handleSecurityViolation('Canvas capture detected');
        }
      }
      return originalGetImageData.apply(this, args);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      CanvasRenderingContext2D.prototype.getImageData = originalGetImageData;
    };
  }, [isPlaying]);

  const handleSecurityViolation = (reason: string) => {
    console.error('Security violation:', reason);
    if (videoRef.current) {
      videoRef.current.pause();
      setError('Security violation detected. Video playback paused.');
    }
    // Report to backend
    apiClient.reportSecurityViolation(lessonId, reason).catch(console.error);
  };

  // Fetch secure video token
  useEffect(() => {
    const fetchSecureVideoToken = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getSecureVideoToken(lessonId, courseId);
        if (response.success && response.data) {
          setSecureToken(response.data.token);
          setWatermarkText(response.data.watermark || '');
        } else {
          setError('Failed to load video. Please try again.');
        }
      } catch (err) {
        setError('Failed to load video. Please try again.');
        console.error('Error fetching video token:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (lessonId && courseId) {
      fetchSecureVideoToken();
    }
  }, [lessonId, courseId]);

  // Security: Add watermark overlay
  useEffect(() => {
    if (!watermarkText || !containerRef.current) return;

    const watermark = document.createElement('div');
    watermark.className = 'absolute inset-0 pointer-events-none z-10';
    watermark.style.background = `repeating-linear-gradient(
      45deg,
      transparent,
      transparent 100px,
      rgba(255, 255, 255, 0.05) 100px,
      rgba(255, 255, 255, 0.05) 200px
    )`;
    
    const watermarkTextElement = document.createElement('div');
    watermarkTextElement.className = 'absolute bottom-4 right-4 text-white text-xs opacity-50';
    watermarkTextElement.textContent = watermarkText;
    watermark.appendChild(watermarkTextElement);

    containerRef.current.appendChild(watermark);

    return () => {
      if (containerRef.current && watermark.parentNode) {
        containerRef.current.removeChild(watermark);
      }
    };
  }, [watermarkText]);

  const togglePlay = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;

    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration;

    setCurrentTime(current);
    setProgress((current / total) * 100);

    if (onProgress) {
      onProgress(progress);
    }

    // Check if video completed
    if (current >= total && total > 0) {
      setIsPlaying(false);
      if (onComplete) {
        onComplete();
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;

    videoRef.current.currentTime = newTime;
    setProgress(pos * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Build secure video URL with token
  const secureVideoUrl = secureToken && videoUrl
    ? `${videoUrl}?token=${secureToken}&expires=${Date.now() + 3600000}` // 1 hour expiry
    : null;

  if (isLoading) {
    return (
      <div className="aspect-video bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading secure video...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aspect-video bg-gray-900 flex items-center justify-center">
        <div className="text-center text-white">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-red-500" />
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative bg-black aspect-video select-none"
      style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
    >
      {/* Security Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
        <Shield className="w-4 h-4 text-green-400" />
        <span className="text-white text-xs font-semibold">Protected Content</span>
      </div>

      {/* Video Element */}
      <video
        ref={videoRef}
        src={secureVideoUrl || undefined}
        className="w-full h-full"
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration);
          }
        }}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setError('Failed to load video')}
        playsInline
        controls={false}
        preload="metadata"
        style={{
          pointerEvents: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
      />

      {/* Custom Controls Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
        {/* Progress Bar */}
        <div
          className="absolute bottom-16 left-0 right-0 h-2 bg-gray-700 cursor-pointer"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-purple-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-purple-400 transition"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="text-white hover:text-purple-400 transition"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? (
                <VolumeX className="w-6 h-6" />
              ) : (
                <Volume2 className="w-6 h-6" />
              )}
            </button>

            <span className="text-white text-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleFullscreen}
              className="text-white hover:text-purple-400 transition"
              aria-label={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? (
                <Minimize className="w-6 h-6" />
              ) : (
                <Maximize className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Additional Watermark Overlay */}
      {watermarkText && (
        <div className="absolute bottom-20 right-4 text-white/30 text-xs pointer-events-none z-20">
          {watermarkText}
        </div>
      )}
    </div>
  );
}

