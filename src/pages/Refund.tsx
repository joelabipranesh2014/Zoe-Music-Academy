export default function Refund() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Refund & Return Policy</h1>
        <div className="bg-white rounded-lg shadow-md p-8 prose max-w-none">
          <p className="text-gray-600 mb-4">Last updated: January 2026</p>
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Refund Eligibility</h2>
          <p className="text-gray-700 mb-4">
            Refunds may be requested within 7 days of course enrollment, provided that less than
            20% of the course content has been accessed.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Refund Process</h2>
          <p className="text-gray-700 mb-4">
            To request a refund, please contact our support team with your enrollment details.
            Refunds will be processed within 5-7 business days.
          </p>
        </div>
      </div>
    </div>
  );
}

