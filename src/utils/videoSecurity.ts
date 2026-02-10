/**
 * Video Security Utilities
 * Provides additional security measures for video content protection
 */

// Detect if DevTools is open
export const detectDevTools = (): boolean => {
  const threshold = 160;
  return (
    window.outerHeight - window.innerHeight > threshold ||
    window.outerWidth - window.innerWidth > threshold
  );
};

// Detect screen recording attempts
export const detectScreenRecording = (): Promise<boolean> => {
  return new Promise((resolve) => {
    // Check for MediaRecorder API usage
    const originalMediaRecorder = window.MediaRecorder;
    
    if (originalMediaRecorder) {
      // Monitor MediaRecorder creation
      window.MediaRecorder = class extends originalMediaRecorder {
        constructor(stream: MediaStream, options?: MediaRecorderOptions) {
          super(stream, options);
          resolve(true);
        }
      } as any;
    }

    // Check for getDisplayMedia (screen sharing)
    if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
      const originalGetDisplayMedia = navigator.mediaDevices.getDisplayMedia.bind(navigator.mediaDevices);
      navigator.mediaDevices.getDisplayMedia = async (...args) => {
        resolve(true);
        return originalGetDisplayMedia(...args);
      };
    }

    setTimeout(() => resolve(false), 100);
  });
};

// Add watermark to video element
export const addWatermark = (
  videoElement: HTMLVideoElement,
  text: string,
  userId?: string
): void => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return;

  canvas.width = videoElement.videoWidth || 1920;
  canvas.height = videoElement.videoHeight || 1080;

  const watermarkText = userId ? `${text} - User: ${userId}` : text;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.font = '24px Arial';
  ctx.fillText(watermarkText, 20, canvas.height - 20);

  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.position = 'absolute';
  overlay.style.bottom = '20px';
  overlay.style.right = '20px';
  overlay.style.color = 'rgba(255, 255, 255, 0.5)';
  overlay.style.fontSize = '12px';
  overlay.style.pointerEvents = 'none';
  overlay.style.zIndex = '1000';
  overlay.textContent = watermarkText;

  const container = videoElement.parentElement;
  if (container) {
    container.style.position = 'relative';
    container.appendChild(overlay);
  }
};

// Prevent video download
export const preventVideoDownload = (videoElement: HTMLVideoElement): void => {
  // Remove right-click context menu
  videoElement.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // Prevent drag
  videoElement.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
  });

  // Disable video controls download
  videoElement.controls = false;
  videoElement.setAttribute('controlsList', 'nodownload');
  videoElement.setAttribute('disablePictureInPicture', 'true');
};

// Monitor for unauthorized access attempts
export const monitorSecurityViolations = (
  videoElement: HTMLVideoElement,
  onViolation: (reason: string) => void
): (() => void) => {
  const violations: string[] = [];

  // Monitor for DevTools
  const devToolsInterval = setInterval(() => {
    if (detectDevTools()) {
      violations.push('DevTools detected');
      onViolation('DevTools detected');
    }
  }, 1000);

  // Monitor for tab visibility (potential screen recording)
  const visibilityHandler = () => {
    if (document.hidden && !videoElement.paused) {
      violations.push('Tab hidden while video playing');
      onViolation('Tab hidden while video playing');
    }
  };
  document.addEventListener('visibilitychange', visibilityHandler);

  // Monitor for screen recording
  detectScreenRecording().then((isRecording) => {
    if (isRecording) {
      violations.push('Screen recording detected');
      onViolation('Screen recording detected');
    }
  });

  // Monitor for canvas capture attempts
  const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
  CanvasRenderingContext2D.prototype.getImageData = function (...args) {
    if (videoElement && this.canvas) {
      const videoRect = videoElement.getBoundingClientRect();
      const canvasRect = this.canvas.getBoundingClientRect();
      
      if (
        canvasRect.left >= videoRect.left &&
        canvasRect.top >= videoRect.top &&
        canvasRect.right <= videoRect.right &&
        canvasRect.bottom <= videoRect.bottom
      ) {
        violations.push('Canvas capture detected');
        onViolation('Canvas capture detected');
      }
    }
    return originalGetImageData.apply(this, args);
  };

  // Cleanup function
  return () => {
    clearInterval(devToolsInterval);
    document.removeEventListener('visibilitychange', visibilityHandler);
    CanvasRenderingContext2D.prototype.getImageData = originalGetImageData;
  };
};

// Generate secure video URL with token
export const generateSecureVideoUrl = (
  baseUrl: string,
  token: string,
  expiresIn: number = 3600
): string => {
  const expiresAt = Date.now() + expiresIn * 1000;
  return `${baseUrl}?token=${token}&expires=${expiresAt}&t=${Date.now()}`;
};

// Validate video token
export const validateVideoToken = (_token: string, expiresAt: number): boolean => {
  return Date.now() < expiresAt;
};

// Obfuscate video URL
export const obfuscateVideoUrl = (url: string): string => {
  // Simple base64 encoding (backend should handle proper encryption)
  return btoa(url).split('').reverse().join('');
};

// Deobfuscate video URL
export const deobfuscateVideoUrl = (obfuscated: string): string => {
  try {
    return atob(obfuscated.split('').reverse().join(''));
  } catch {
    return '';
  }
};

