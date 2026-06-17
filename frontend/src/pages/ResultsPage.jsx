import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ResultsPage = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedResults = localStorage.getItem('uploadResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      navigate('/upload');
    }
  }, [navigate]);

  const handleNewUpload = () => {
    localStorage.removeItem('uploadResults');
    navigate('/upload');
  };

  const handleExportResults = () => {
    const dataStr = JSON.stringify(results, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const fileName = `results-${new Date().toISOString()}.json`;

    const link = document.createElement('a');
    link.href = dataUri;
    link.download = fileName;
    link.click();
  };

  const getFilteredResults = () => {
    if (!results) return [];
    if (filter === 'all') return results.results;
    return results.results.filter(r =>
      filter === 'real' ? r.isReal : !r.isReal
    );
  };

  const getStats = () => {
    if (!results) return null;
    const total = results.results.length;
    const real = results.results.filter(r => r.isReal).length;
    const spoof = total - real;
    const avg = (
      results.results.reduce((sum, r) => sum + parseFloat(r.confidence), 0) / total
    ).toFixed(1);

    return { total, real, spoof, avg };
  };

  if (!results) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
        <p className="mt-4 text-gray-600">Loading results...</p>
      </div>
    </div>
  );

  const stats = getStats();
  const filtered = getFilteredResults();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Analysis Results
          </h1>
          <p className="text-gray-500">Review your spoof detection results</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-500 font-medium">Total Images</p>
              <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-500 font-medium">Real</p>
              <p className="text-2xl font-bold text-green-600">{stats.real}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-500 font-medium">Spoof</p>
              <p className="text-2xl font-bold text-red-600">{stats.spoof}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <p className="text-sm text-gray-500 font-medium">Avg Confidence</p>
              <p className="text-2xl font-bold text-blue-600">{stats.avg}%</p>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All Images
          </button>
          <button
            onClick={() => setFilter('real')}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              filter === 'real'
                ? 'bg-green-600 text-white shadow-md shadow-green-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Real Only
          </button>
          <button
            onClick={() => setFilter('spoof')}
            className={`px-5 py-2 rounded-lg font-medium transition-all ${
              filter === 'spoof'
                ? 'bg-red-600 text-white shadow-md shadow-red-200'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            Spoof Only
          </button>
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <p className="text-gray-500">No images match the selected filter</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedImage(r)}
              >
                <div className="relative overflow-hidden bg-gray-100 h-48">
                  <img
                    src={r.imageData}
                    alt={r.filename}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-semibold ${
                    r.isReal 
                      ? 'bg-green-500 text-white shadow-lg' 
                      : 'bg-red-500 text-white shadow-lg'
                  }`}>
                    {r.confidence}%
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-gray-800 truncate mb-2" title={r.filename}>
                    {r.filename}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      r.isReal
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {r.label}
                    </span>
                    <span className="text-xs text-gray-400">Click to expand</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <button
            onClick={handleNewUpload}
            className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            Upload Again
          </button>
          <button
            onClick={handleExportResults}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md shadow-blue-200 transition-all"
          >
            Export JSON
          </button>
        </div>

        {/* Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img
                  src={selectedImage.imageData}
                  alt={selectedImage.filename}
                  className="w-full rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-gray-800 text-lg mb-2 break-all">
                  {selectedImage.filename}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Classification:</span>
                    <span className={`font-semibold ${
                      selectedImage.isReal ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedImage.label}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500">Confidence:</span>
                    <span className="font-semibold text-blue-600">
                      {selectedImage.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsPage;