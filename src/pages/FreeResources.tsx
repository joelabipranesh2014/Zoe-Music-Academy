import { Play, Music } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FreeResources() {
  const resources = [
    {
      title: 'Keyboard - Beginners (Tamil)',
      description: 'Master the basics in just 10 classes!',
      type: 'Video Course',
    },
    {
      title: 'Keyboard - Beginners (English)',
      description: 'Learn keyboard fundamentals step-by-step',
      type: 'Video Course',
    },
    {
      title: 'Guitar - Beginners (Tamil)',
      description: 'Start your guitar journey today',
      type: 'Video Course',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Free Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock your musical potential with our free resources! Get access to free lessons,
            tips, and practice materials at Zoe Music Academy!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {resources.map((resource, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <div className="h-48 bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                <Music className="w-20 h-20 text-white opacity-80" />
              </div>
              <div className="p-6">
                <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block">
                  FREE
                </span>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{resource.type}</span>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition flex items-center">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-6">
            Want access to more courses and premium content?
          </p>
          <Link
            to="/courses"
            className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition inline-block"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    </div>
  );
}

