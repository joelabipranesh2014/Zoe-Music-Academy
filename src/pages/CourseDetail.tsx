import { useParams, Link } from 'react-router-dom';
import { Clock, Play, CheckCircle, User } from 'lucide-react';
import { useCourse } from '../hooks/useCourses';
import { useLessons } from '../hooks/useLessons';
import { getCourseImage } from '../utils/imagePaths';

export default function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const { course, error: courseError } = useCourse(id);
  const { lessons } = useLessons(id);

  if (courseError || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {courseError || 'Course not found'}
          </h2>
          <Link to="/courses" className="text-purple-600 hover:underline">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Banner */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${getCourseImage(course.id)})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-900/80"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl text-white">
              <div className="flex items-center mb-4">
                <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold mr-3">
                  {course.instrument_type}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-sm font-semibold">
                  {course.level}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-purple-100 mb-6">{course.description}</p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>10 Lessons</span>
                </div>
                <div className="flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  <span>{lessons.length} Videos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What You'll Learn</h2>
              <ul className="space-y-3">
                {[
                  'Master the fundamentals of music theory',
                  'Learn proper playing techniques',
                  'Play your favorite songs confidently',
                  'Understand rhythm and timing',
                  'Develop musical expression and creativity',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Curriculum</h2>
              <div className="space-y-4">
                {lessons.map((lesson, idx) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-purple-600 font-semibold">{idx + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{formatDuration(lesson.duration)}</span>
                          {lesson.is_free_trial && (
                            <span className="ml-3 bg-green-100 text-green-600 px-2 py-0.5 rounded text-xs">
                              Free Trial
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Play className="w-5 h-5 text-purple-600" />
                  </div>
                ))}
                {/* Placeholder for remaining lessons */}
                {Array.from({ length: 10 - lessons.length }).map((_, idx) => (
                  <div
                    key={`placeholder-${idx}`}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg opacity-50"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                        <span className="text-gray-400 font-semibold">{lessons.length + idx + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-400">Lesson {lessons.length + idx + 1}</h3>
                        <div className="flex items-center text-sm text-gray-400 mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Coming soon</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <div className="text-center mb-6">
                <div className="w-32 h-32 rounded-lg mx-auto mb-4 overflow-hidden shadow-md">
                  <img
                    src={getCourseImage(course.id)}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  ₹{course.price.toLocaleString()}
                </div>
                <p className="text-gray-600">One-time payment</p>
              </div>

              <div className="space-y-4 mb-6">
                <button className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed" disabled>
                  Coming Soon
                </button>
                <button className="w-full bg-white border-2 border-gray-400 text-gray-400 py-3 rounded-lg font-semibold cursor-not-allowed" disabled>
                  Coming Soon
                </button>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">Course Includes:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    10 Video Lessons
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Practice Materials
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    6 Months Access
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    24/7 Support
                  </li>
                </ul>
              </div>

              <div className="border-t pt-6 mt-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Ezra Richard</h4>
                    <p className="text-sm text-gray-600">Tutor, Zoe Music Academy</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Ezra Richard is an accomplished musician, singer, music producer & tutor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

