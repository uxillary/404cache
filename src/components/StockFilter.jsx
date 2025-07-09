function StockFilter({ search, onSearch }) {
  return (
    <div className="mb-4 flex space-x-2">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search stocks..."
        className="flex-grow px-2 py-1 rounded bg-gray-900 border border-green-600 text-green-200"
      />
      {search && (
        <button
          onClick={() => onSearch('')}
          className="px-2 py-1 rounded bg-red-700 text-white hover:bg-red-800"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default StockFilter;
