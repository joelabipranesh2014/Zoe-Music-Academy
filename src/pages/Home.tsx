import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, Music, Users, Video, Award, ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import { mockCourses, mockTestimonials } from '../data/mockData';
import { getCourseImage, heroImages } from '../utils/imagePaths';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

function StatCard({ icon: Icon, number, label, delay }: { icon: LucideIcon; number: string; label: string; delay: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });
  return (
    <div
      ref={elementRef}
      className={`bg-white p-8 rounded-xl shadow-lg hover-lift transition-all ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full mb-4">
        <Icon className="w-8 h-8 text-purple-600" />
      </div>
      <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
        {number}
      </h3>
      <p className="text-gray-600 font-medium">{label}</p>
    </div>
  );
}

function TestimonialCard({ testimonial, delay }: { testimonial: typeof mockTestimonials[0]; delay: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  return (
    <div
      ref={elementRef}
      className={`bg-white p-6 md:p-8 rounded-xl shadow-lg border-l-4 border-purple-600 hover-lift transition-all ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">⭐</span>
        ))}
      </div>
      <p className="text-gray-700 mb-6 italic text-lg leading-relaxed">"{testimonial.text}"</p>
      <div className="flex items-center">
        <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mr-4">
          <Users className="w-7 h-7 text-purple-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-lg">{testimonial.name}</p>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ resource, delay }: { resource: { title: string; icon: LucideIcon }; delay: number }) {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });
  return (
    <div
      ref={elementRef}
      className={`glass p-6 md:p-8 rounded-xl border border-white/30 hover:bg-white/20 transition-all hover-lift ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <resource.icon className="w-6 h-6" />
        </div>
        <Play className="w-8 h-8 opacity-80" />
      </div>
      <h3 className="text-xl font-semibold mb-3">{resource.title}</h3>
      <p className="text-purple-100 text-sm mb-6 leading-relaxed">
        Master the basics in just 10 classes! With our focused, step-by-step approach.
      </p>
      <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 w-full shadow-lg">
        Coming Soon
      </button>
    </div>
  );
}

function FeaturedCoursesCarousel() {
  const featuredCourses = mockCourses.slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const getCoursesPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg: 3 courses
      if (window.innerWidth >= 768) return 2; // md: 2 courses
      return 1; // sm: 1 course
    }
    return 3;
  };

  const [coursesPerView, setCoursesPerView] = useState(getCoursesPerView());

  useEffect(() => {
    const handleResize = () => {
      setCoursesPerView(getCoursesPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, featuredCourses.length - coursesPerView);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div 
          ref={elementRef}
          className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Featured <span className="gradient-text">Courses</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>
        
        <div className="relative">
          {/* Courses Carousel Container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out gap-6"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / coursesPerView)}%)` 
              }}
            >
              {featuredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift flex-shrink-0 group"
                  style={{ 
                    width: `calc(${100 / coursesPerView}% - ${(coursesPerView - 1) * 24 / coursesPerView}px)`,
                    minWidth: `calc(${100 / coursesPerView}% - ${(coursesPerView - 1) * 24 / coursesPerView}px)`
                  }}
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={getCourseImage(course.id)}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-purple-600 shadow-md">
                      {course.level}
                    </div>
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {course.instrument_type}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">{course.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                        ₹{course.price.toLocaleString()}
                      </span>
                      <Link
                        to={`/courses/${course.id}`}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105 text-sm"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          {featuredCourses.length > coursesPerView && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white shadow-xl hover:bg-purple-50 text-purple-600 p-3 rounded-full transition-all hover:scale-110 hover-glow"
                aria-label="Previous courses"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white shadow-xl hover:bg-purple-50 text-purple-600 p-3 rounded-full transition-all hover:scale-110 hover-glow"
                aria-label="Next courses"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {featuredCourses.length > coursesPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'w-8 bg-gradient-to-r from-purple-600 to-indigo-600'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to course group ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const heroSlides = [
  {
    id: 1,
    image: heroImages.slide1,
    title: 'Music is a Language,',
    subtitle: "Let's Speak It!",
    description: 'Join our music class and explore the joy of melodies, rhythms, and harmony.',
    description2: "Whether you're a beginner or a pro, let's make music together! 🎶",
  },
  {
    id: 2,
    image: heroImages.slide2,
    title: 'Learn Keyboard',
    subtitle: 'Master the Art of Keys',
    description: 'From basics to advanced techniques, learn keyboard at your own pace.',
    description2: 'Expert guidance with personalized lessons designed for every skill level.',
  },
  {
    id: 3,
    image: heroImages.slide3,
    title: 'Play Guitar',
    subtitle: 'Strum Your Way to Success',
    description: 'Discover the magic of guitar playing with our comprehensive courses.',
    description2: 'Learn chords, melodies, and songs that will inspire your musical journey.',
  },
  {
    id: 4,
    image: heroImages.slide4,
    title: 'Vocal Training',
    subtitle: 'Find Your Voice',
    description: 'Unleash your vocal potential with professional singing lessons.',
    description2: 'Build confidence and technique with our expert vocal coaches.',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div>
      {/* Hero Section - Carousel */}
      <section className="relative h-[600px] md:h-[700px] overflow-hidden">
        {/* Carousel Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/85 via-indigo-900/80 to-purple-900/85"></div>
            </div>
            <div className="relative z-20 h-full flex items-center">
              <div className={`container mx-auto px-4 text-center text-white ${index === currentSlide ? 'animate-fade-in-up' : ''}`}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  <span className="inline-block animate-fade-in-down">{slide.title}</span>
                  <br />
                  <span className="inline-block bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent animate-fade-in-up">
                    {slide.subtitle}
                  </span>
                </h1>
                <p className="text-lg md:text-xl mb-2 text-purple-100 max-w-3xl mx-auto">
                  {slide.description}
                </p>
                <p className="text-lg md:text-xl mb-8 text-purple-100 max-w-3xl mx-auto">
                  {slide.description2}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/courses"
                    className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
                  >
                    Join Now
                  </Link>
                  <Link
                    to="/courses"
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 backdrop-blur-sm text-lg"
                  >
                    Our Courses
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all backdrop-blur-md hover:scale-110 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all backdrop-blur-md hover:scale-110 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-8 bg-white shadow-lg'
                  : 'w-3 bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <StatCard icon={Users} number="1000+" label="Students Graduated" delay={0} />
            <StatCard icon={Video} number="500+" label="Videos Uploaded" delay={100} />
            <StatCard icon={Award} number="10+" label="Trained Instructors" delay={200} />
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                What We <span className="gradient-text">Offer</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full"></div>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At Zoe Music Academy, we are passionate about nurturing talent and guiding music
              enthusiasts on their journey. Whether you're a beginner, an intermediate learner,
              or an advanced musician, we offer personalized music training to help you excel.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-purple-50 p-8 md:p-12 rounded-2xl shadow-xl border border-purple-100">
            <p className="text-lg md:text-xl text-gray-700 text-center mb-8 leading-relaxed">
              We provide expert music training for all levels, covering a wide range of instruments
              and vocal coaching. Our programs focus on skill development, performance techniques,
              and creative musical expression.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl text-center"
              >
                Join Now
              </Link>
              <Link
                to="/about"
                className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-md hover:shadow-lg text-center"
              >
                Know More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <FeaturedCoursesCarousel />

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              What People Say <span className="gradient-text">About Us</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-indigo-600 mx-auto rounded-full mb-4"></div>
            <p className="text-center text-gray-600 text-lg max-w-2xl mx-auto">
              Here's what our happy students and parents have to say about their amazing experiences
              at Zoe Music Academy!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockTestimonials.map((testimonial, idx) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} delay={idx * 100} />
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Free Resources</h2>
            <div className="w-24 h-1 bg-white mx-auto rounded-full mb-4"></div>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto">
              Unlock your musical potential with our free resources! Get access to free lessons,
              tips, and practice materials at Zoe Music Academy!
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ResourceCard resource={{ title: 'Keyboard - Beginners (Tamil)', icon: Music }} delay={0} />
            <ResourceCard resource={{ title: 'Keyboard - Beginners (English)', icon: Music }} delay={100} />
            <ResourceCard resource={{ title: 'Guitar - Beginners (Tamil)', icon: Music }} delay={200} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Watch Your Free Video <span className="bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">Now!</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 mb-6 font-medium">
            Ready to begin your musical journey? Watch our First class for FREE!
          </p>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Explore our exclusive resources – including lessons, tips, and
            practice material! Whether you're interested in the keyboard or guitar, start your
            music adventure with Zoe Music Academy today.
          </p>
          <p className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            What are you waiting for?
          </p>
          <p className="text-xl mb-10 text-gray-200">Take the first step towards mastering your instrument!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl text-lg"
            >
              Watch Now
            </Link>
            <Link
              to="/courses"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all transform hover:scale-105 backdrop-blur-sm text-lg"
            >
              Know More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

