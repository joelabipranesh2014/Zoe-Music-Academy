import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What levels of classes do you offer?',
    answer:
      'We offer Basic and Advanced Keyboard online courses, as well as Beginner Guitar online courses. Each course consists of 10 lessons designed to help you master the fundamentals and build your skills.',
  },
  {
    question: 'How long does it take to complete a course?',
    answer:
      'Each of our online courses is structured into 10 lessons, which can be completed at your own pace. You can go through them as quickly or slowly as you like, depending on your schedule and learning speed.',
  },
  {
    question: 'Do I need any special equipment to take the online lessons?',
    answer:
      "You'll need a keyboard or guitar to practice on, as well as a device to access the online lessons (laptop, tablet, or smartphone). Internet access is required to stream the lessons.",
  },
  {
    question: 'Can I try a class before committing?',
    answer:
      'Yes! We offer a free trial lesson for each of our courses. This gives you a chance to experience our teaching style and the quality of our lessons before you make a decision.',
  },
  {
    question: 'How do I access the online lessons?',
    answer:
      "Our online platform allows you to watch lessons, practice exercises, and learn at your own pace. Lessons are available anytime, anywhere, so you can learn at your convenience.",
  },
  {
    question: 'How do I get started with a course?',
    answer:
      'You can browse our courses and view course details to learn more about what each course offers. Contact us for more information about getting started with your musical journey.',
  },
  {
    question: 'How long is my course access valid for?',
    answer:
      'Course access duration varies depending on the course package. Contact us for specific details about access duration and any available extensions for your chosen course.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept a variety of payment methods for your convenience. For Indian students, we support Debit/Credit Cards, UPI, and QR payments. For international students, we offer PayPal as the payment method.',
  },
  {
    question: 'What is included in the syllabus?',
    answer:
      'Our syllabus is carefully crafted to help you learn with ease. The curriculum is based on Christian songs and incorporates easy-to-learn techniques to make your learning experience enjoyable and effective. You\'ll master essential skills while playing meaningful and familiar tunes!',
  },
  {
    question: 'What if I need technical support?',
    answer:
      'We offer 24/7 technical support to ensure you have a smooth learning experience. If you encounter any issues with the platform or need help accessing the lessons, simply reach out to our support team, and we\'ll assist you promptly.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600">
              Here are some of the most commonly asked questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition"
                >
                  <h3 className="text-lg font-semibold text-gray-800 pr-4">
                    {index + 1}. {faq.question}
                  </h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

