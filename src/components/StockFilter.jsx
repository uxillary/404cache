function StockFilter({ search, onSearch }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search stocks..."
        className="w-full px-2 py-1 rounded bg-gray-900 border border-green-600 text-green-200"
      />
    </div>
  );
}

export default StockFilter;
