export default function LoadingSkeleton(): JSX.Element {
  return (
    <div
      className="w-full p-4 space-y-4 divide-y divide-gray-200 rounded shadow animate-pulse md:p-6"
      role="status"
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className={`flex items-center justify-between ${index !== 0 ? "pt-4" : ""}`}
        >
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
