import { Link } from 'react-router-dom';
import { Play, Clock, CheckCircle, Music, BookOpen, Download } from 'lucide-react';
import { mockCourses } from '../data/mockData';
import { getUser } from '../utils/auth';

export default function Dashboard() {
  const user = getUser();
  // Mock enrolled courses - replace with real data
  const enrolledCourses = mockCourses.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-8 rounded-lg mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.name || 'Student'}! 🎶
          </h1>
          <p className="text-purple-100">Continue your musical journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Enrolled Courses</p>
                <p className="text-3xl font-bold text-gray-800">{enrolledCourses.length}</p>
              </div>
              <BookOpen className="w-12 h-12 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Lessons Completed</p>
                <p className="text-3xl font-bold text-gray-800">12</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Hours Watched</p>
                <p className="text-3xl font-bold text-gray-800">8.5</p>
              </div>
              <Clock className="w-12 h-12 text-blue-600" />
            </div>
          </div>
        </div>

        {/* My Courses */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Courses</h2>
            <Link
              to="/courses"
              className="text-purple-600 hover:text-purple-700 font-semibold"
            >
              Browse All Courses →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-40 bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center relative">
                  <Music className="w-16 h-16 text-white opacity-80" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
                    {course.level}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold text-gray-800">60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <Play className="w-4 h-4 mr-1" />
                      6/10 Lessons
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      2h 30m
                    </span>
                  </div>

                  <Link
                    to={`/courses/${course.id}/learn`}
                    className="block w-full bg-purple-600 text-white text-center py-2 rounded-lg hover:bg-purple-700 transition font-semibold"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {[
              { title: 'Introduction to Keyboard', course: 'Keyboard - Beginners (Tamil)', time: '2 hours ago' },
              { title: 'Basic Notes and Scales', course: 'Keyboard - Beginners (Tamil)', time: '1 day ago' },
              { title: 'Guitar Chords Basics', course: 'Guitar - Beginners (Tamil)', time: '2 days ago' },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.course}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Downloads */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Downloads</h2>
            <button className="text-purple-600 hover:text-purple-700 font-semibold">
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Keyboard Basics PDF', type: 'PDF', size: '2.5 MB' },
              { name: 'Practice Sheet Music', type: 'PDF', size: '1.8 MB' },
              { name: 'Audio Practice Track', type: 'Audio', size: '5.2 MB' },
            ].map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-purple-300 transition"
              >
                <div className="flex items-center">
                  <Download className="w-5 h-5 text-purple-600 mr-3" />
                  <div>
                    <p className="font-semibold text-gray-800">{file.name}</p>
                    <p className="text-sm text-gray-600">{file.type} • {file.size}</p>
                  </div>
                </div>
                <button className="text-purple-600 hover:text-purple-700">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

