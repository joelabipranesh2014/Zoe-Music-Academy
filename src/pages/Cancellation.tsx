export default function Cancellation() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Cancellation Policy</h1>
        <div className="bg-white rounded-lg shadow-md p-8 prose max-w-none">
          <p className="text-gray-600 mb-4">Last updated: January 2026</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Course Cancellation</h2>
          <p className="text-gray-700 mb-4">
            You may cancel your enrollment at any time. However, access to course materials will
            cease upon cancellation.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Refund on Cancellation</h2>
          <p className="text-gray-700 mb-4">
            Cancellations made within 7 days of enrollment may be eligible for a full refund,
            subject to our Refund Policy terms.
          </p>
        </div>
      </div>
    </div>
  );
}

