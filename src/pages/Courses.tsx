import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Music, Filter, Loader2 } from 'lucide-react';
import { useCourses } from '../hooks/useCourses';

export default function Courses() {
  const [searchParams] = useSearchParams();
  const [selectedInstrument, setSelectedInstrument] = useState<string>(
    searchParams.get('instrument') || 'all'
  );
  const [selectedLevel, setSelectedLevel] = useState<string>(
    searchParams.get('level') || 'all'
  );

  const filters = {
    instrument_type: selectedInstrument !== 'all' ? selectedInstrument : undefined,
    level: selectedLevel !== 'all' ? selectedLevel : undefined,
  };

  const { courses, loading, error } = useCourses(filters);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Courses</h1>
          <p className="text-xl text-gray-600">
            Choose from our wide range of music courses designed for all skill levels
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-lg shadow-md sticky top-24">
              <div className="flex items-center mb-4">
                <Filter className="w-5 h-5 mr-2 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
              </div>

              {/* Instrument Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">Instrument</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Instruments' },
                    { value: 'keyboard', label: 'Keyboard' },
                    { value: 'guitar', label: 'Guitar' },
                    { value: 'vocal', label: 'Vocal' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="instrument"
                        value={option.value}
                        checked={selectedInstrument === option.value}
                        onChange={(e) => setSelectedInstrument(e.target.value)}
                        className="mr-2 text-purple-600"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Level</h3>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'All Levels' },
                    { value: 'beginner', label: 'Beginner' },
                    { value: 'intermediate', label: 'Intermediate' },
                    { value: 'advanced', label: 'Advanced' },
                  ].map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        value={option.value}
                        checked={selectedLevel === option.value}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="mr-2 text-purple-600"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
              </div>
            ) : error ? (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
                  >
                    <div className="h-48 bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center relative">
                      <Music className="w-20 h-20 text-white opacity-80" />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-purple-600">
                        {course.level}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center mb-2">
                        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-semibold mr-2">
                          {course.instrument_type}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-purple-600">
                          ₹{course.price.toLocaleString()}
                        </span>
                        <Link
                          to={`/courses/${course.id}`}
                          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow-md text-center">
                <Music className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
                <p className="text-gray-600">
                  Try adjusting your filters to see more courses.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

