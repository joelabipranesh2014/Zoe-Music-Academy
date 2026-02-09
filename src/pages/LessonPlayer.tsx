import { useParams, Link } from 'react-router-dom';
import { Play, CheckCircle, Clock, Download, ChevronLeft } from 'lucide-react';
import { mockCourses, mockLessons } from '../data/mockData';
import { useState } from 'react';
import SecureVideoPlayer from '../components/Video/SecureVideoPlayer';
import { apiClient } from '../services/api';

export default function LessonPlayer() {
  const { courseId } = useParams<{ courseId: string }>();
  const course = mockCourses.find((c) => c.id === courseId);
  const lessons = mockLessons.filter((l) => l.course_id === courseId);
  const [currentLesson, setCurrentLesson] = useState(lessons[0] || null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  if (!course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Course not found</h2>
          <Link to="/dashboard" className="text-purple-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const toggleLessonComplete = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId)
        ? prev.filter((id) => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Link
            to="/dashboard"
            className="flex items-center text-white hover:text-purple-400 transition"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-xl font-semibold text-white">{course.title}</h1>
          <div></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Secure Video Player */}
        <div className="flex-1 bg-black">
          {currentLesson ? (
            <SecureVideoPlayer
              lessonId={currentLesson.id}
              courseId={courseId || ''}
              videoUrl={currentLesson.video_url}
              title={currentLesson.title}
              onProgress={(progress) => {
                // Track progress if needed
                console.log('Video progress:', progress);
              }}
              onComplete={() => {
                // Mark lesson as complete when video finishes
                toggleLessonComplete(currentLesson.id);
                // Update progress on backend
                apiClient.updateLessonProgress(currentLesson.id, true).catch(console.error);
              }}
            />
          ) : (
            <div className="aspect-video bg-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <Play className="w-20 h-20 mx-auto mb-4 opacity-50" />
                <p className="text-xl">Select a lesson to start</p>
              </div>
            </div>
          )}

          {/* Lesson Info */}
          {currentLesson && (
            <div className="bg-gray-800 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{currentLesson.title}</h2>
                <button
                  onClick={() => toggleLessonComplete(currentLesson.id)}
                  className={`flex items-center px-4 py-2 rounded-lg transition ${
                    completedLessons.includes(currentLesson.id)
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {completedLessons.includes(currentLesson.id) ? 'Completed' : 'Mark Complete'}
                </button>
              </div>
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  {formatDuration(currentLesson.duration)}
                </div>
                {currentLesson.is_free_trial && (
                  <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                    Free Trial
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Lesson List Sidebar */}
        <div className="lg:w-80 bg-gray-800 border-l border-gray-700 overflow-y-auto max-h-screen">
          <div className="p-4 border-b border-gray-700">
            <h3 className="text-white font-semibold mb-2">Course Content</h3>
            <p className="text-sm text-gray-400">
              {lessons.length} lessons • {formatDuration(lessons.reduce((acc, l) => acc + l.duration, 0))}
            </p>
          </div>
          <div className="divide-y divide-gray-700">
            {lessons.map((lesson, idx) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLesson(lesson)}
                className={`w-full text-left p-4 hover:bg-gray-700 transition ${
                  currentLesson?.id === lesson.id ? 'bg-gray-700 border-l-4 border-purple-600' : ''
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3">
                    {completedLessons.includes(lesson.id) ? (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-500 rounded-full mt-0.5"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium mb-1 ${
                      currentLesson?.id === lesson.id ? 'text-white' : 'text-gray-300'
                    }`}>
                      {idx + 1}. {lesson.title}
                    </p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDuration(lesson.duration)}
                      {lesson.is_free_trial && (
                        <span className="ml-2 bg-green-600 text-white px-2 py-0.5 rounded text-xs">
                          Free
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
            {/* Placeholder for remaining lessons */}
            {Array.from({ length: 10 - lessons.length }).map((_, idx) => (
              <div
                key={`placeholder-${idx}`}
                className="p-4 opacity-50"
              >
                <div className="flex items-start">
                  <div className="w-5 h-5 border-2 border-gray-600 rounded-full mt-0.5 mr-3"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-500 mb-1">
                      {lessons.length + idx + 1}. Lesson {lessons.length + idx + 1}
                    </p>
                    <p className="text-xs text-gray-600">Coming soon</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Download Materials */}
          <div className="p-4 border-t border-gray-700">
            <h3 className="text-white font-semibold mb-3">Download Materials</h3>
            <div className="space-y-2">
              {[
                'Practice Sheet Music',
                'Audio Practice Track',
                'Lesson Notes PDF',
              ].map((material, idx) => (
                <button
                  key={idx}
                  className="w-full flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition text-left"
                >
                  <span className="text-sm text-gray-300">{material}</span>
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

