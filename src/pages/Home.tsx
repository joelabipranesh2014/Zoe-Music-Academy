import { Link } from 'react-router-dom';
import { Play, Music, Users, Video, Award } from 'lucide-react';
import { mockCourses, mockTestimonials } from '../data/mockData';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Music is a Language,
            <br />
            Let's Speak It!
          </h1>
          <p className="text-xl mb-8 text-purple-100">
            Join our music class and explore the joy of melodies, rhythms, and harmony.
            <br />
            Whether you're a beginner or a pro, let's make music together! 🎶
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition text-lg"
            >
              Join Now
            </Link>
            <Link
              to="/courses"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition text-lg"
            >
              Our Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">1000+</h3>
              <p className="text-gray-600">Students Graduated</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Video className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">500+</h3>
              <p className="text-gray-600">Videos Uploaded</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">10+</h3>
              <p className="text-gray-600">Trained Instructors</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              At Zoe Music Academy, we are passionate about nurturing talent and guiding music
              enthusiasts on their journey. Whether you're a beginner, an intermediate learner,
              or an advanced musician, we offer personalized music training to help you excel.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-lg">
            <p className="text-lg text-gray-700 text-center">
              We provide expert music training for all levels, covering a wide range of instruments
              and vocal coaching. Our programs focus on skill development, performance techniques,
              and creative musical expression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link
                to="/courses"
                className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition text-center"
              >
                Join Now
              </Link>
              <Link
                to="/about"
                className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition text-center"
              >
                Know More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCourses.slice(0, 4).map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div className="h-48 bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center">
                  <Music className="w-20 h-20 text-white opacity-80" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-2">{course.description}</p>
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
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            What People Say About Us
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Here's what our happy students and parents have to say about their amazing experiences
            at Zoe Music Academy!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-600"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Free Resources</h2>
            <p className="text-xl text-purple-100">
              Unlock your musical potential with our free resources! Get access to free lessons,
              tips, and practice materials at Zoe Music Academy!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Keyboard - Beginners (Tamil)', icon: Music },
              { title: 'Keyboard - Beginners (English)', icon: Music },
              { title: 'Guitar - Beginners (Tamil)', icon: Music },
            ].map((resource, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20 hover:bg-white/20 transition"
              >
                <div className="flex items-center justify-between mb-4">
                  <resource.icon className="w-8 h-8" />
                  <Play className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                <p className="text-purple-100 text-sm mb-4">
                  Master the basics in just 10 classes! With our focused, step-by-step approach.
                </p>
                <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-purple-50 transition w-full">
                  Watch Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Watch Your Free Video Now!</h2>
          <p className="text-xl text-gray-300 mb-8">
            Ready to begin your musical journey? Watch our First class for FREE!
          </p>
          <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
            Sign-up today and gain access to our exclusive resources – including lessons, tips, and
            practice material! Whether you're interested in the keyboard or guitar, sign-up today,
            to start your music adventure with Zoe Music Academy.
          </p>
          <p className="text-2xl font-bold mb-8">What are you waiting for?</p>
          <p className="text-xl mb-8">Take the first step towards mastering your instrument!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition text-lg"
            >
              Watch Now
            </Link>
            <Link
              to="/courses"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition text-lg"
            >
              Know More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

