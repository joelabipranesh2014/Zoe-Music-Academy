import { Music, Users, Award, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Zoe Music Academy</h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            We are passionate about nurturing talent and guiding music enthusiasts on their journey
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6 text-center">
              At Zoe Music Academy, we believe that music is a universal language that brings people
              together. Our mission is to make quality music education accessible to everyone,
              regardless of their skill level or background.
            </p>
            <p className="text-lg text-gray-700 text-center">
              We provide expert music training for all levels, covering a wide range of instruments
              and vocal coaching. Our programs focus on skill development, performance techniques,
              and creative musical expression.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Music,
                title: 'Quality Education',
                description: 'Expert instructors and comprehensive curriculum',
              },
              {
                icon: Users,
                title: 'Student Focused',
                description: 'Personalized learning paths for every student',
              },
              {
                icon: Award,
                title: 'Excellence',
                description: 'Commitment to helping you achieve your musical goals',
              },
              {
                icon: Target,
                title: 'Accessibility',
                description: 'Learn at your own pace, anytime, anywhere',
              },
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <value.icon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center mb-6 md:mb-0 md:mr-8">
                <Users className="w-16 h-16 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Joel Thomasraj</h2>
                <p className="text-lg text-purple-600 mb-4">Tutor, Zoe Music Academy</p>
                <p className="text-gray-700 mb-4">
                  Joel Thomasraj is an accomplished musician, singer, music producer & tutor. With
                  years of experience in the music industry, Joel brings a wealth of knowledge and
                  passion to every lesson.
                </p>
                <p className="text-gray-700">
                  His teaching methodology focuses on making music learning enjoyable and effective,
                  helping students master essential skills while playing meaningful and familiar tunes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

