import { Music, Users, Award, Target, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { heroImages, instructorImages } from '../utils/imagePaths';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function ValueCard({ icon: Icon, title, description, delay }: { icon: LucideIcon; title: string; description: string; delay: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  return (
    <div
      ref={elementRef}
      className={`text-center bg-white p-6 rounded-xl shadow-lg hover-lift transition-all ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full mb-4">
        <Icon className="w-10 h-10 text-purple-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function InstructorImage() {
  const [imageError, setImageError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);

  return (
    <div className="relative mb-6 md:mb-0 md:mr-8">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-xl ring-4 ring-purple-200 ring-offset-2 animate-float">
        {!fallbackError ? (
          <img
            src={imageError ? instructorImages.default : instructorImages.ezraRichard}
            alt="Ezra Richard - Founder & Director"
            className="w-full h-full object-cover"
            onError={() => {
              if (!imageError) {
                setImageError(true);
              } else {
                setFallbackError(true);
              }
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
            <Users className="w-16 h-16 md:w-20 md:h-20 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear"
          style={{ backgroundImage: `url(${heroImages.about})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/85 via-indigo-900/80 to-purple-900/85"></div>
        </div>
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 text-center text-white animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">Zoe Music Academy</span>
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              We are passionate about nurturing talent and guiding music enthusiasts on their journey
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Our <span className="gradient-text">Mission</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full"></div>
            </div>
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed">
                At Zoe Music Academy, we believe that music is a universal language that brings people
                together. Our mission is to make quality music education accessible to everyone,
                regardless of their skill level or background.
              </p>
              <p className="text-lg md:text-xl text-gray-700 text-center leading-relaxed">
                We provide expert music training for all levels, covering a wide range of instruments
                and vocal coaching. Our programs focus on skill development, performance techniques,
                and creative musical expression.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What We Stand <span className="gradient-text">For</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard icon={Music} title="Quality Education" description="Expert instructors and comprehensive curriculum" delay={0} />
            <ValueCard icon={Users} title="Student Focused" description="Personalized learning paths for every student" delay={100} />
            <ValueCard icon={Award} title="Excellence" description="Commitment to helping you achieve your musical goals" delay={200} />
            <ValueCard icon={Target} title="Accessibility" description="Learn at your own pace, anytime, anywhere" delay={300} />
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-2xl p-8 md:p-12 border border-purple-100">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <InstructorImage />
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Ezra Richard</h2>
                <p className="text-lg md:text-xl text-purple-600 mb-6 font-semibold">Founder & Director, Zoe Music Academy</p>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p className="text-base md:text-lg">
                    Ezra Richard is a highly respected musician, vocalist, and music director with a
                    distinguished career spanning several years in the professional music industry.
                    His expertise encompasses performance, composition, and music direction, shaped by
                    extensive practical and academic experience.
                  </p>
                  <p className="text-base md:text-lg">
                    Throughout his career, Ezra has worked across diverse musical genres, bringing a
                    refined understanding of musical structure, technique, and artistic interpretation.
                    His work reflects a strong dedication to excellence, discipline, and creative integrity.
                  </p>
                  <p className="text-base md:text-lg">
                    As an educator, his teaching philosophy is rooted in structured learning, technical
                    mastery, and expressive performance. He emphasizes a balanced approach that combines
                    foundational theory with hands-on practice, allowing students to develop confidence,
                    precision, and musical sensitivity through carefully curated and meaningful repertoire.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

