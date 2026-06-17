import { useState } from "react";

function Upload() {
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handlePredict = () => {
    alert("Prediction started (connect backend later)");
  };

  return (
    <div>

      {/* Upload Box */}
      <label className="block border-2 border-dashed border-gray-400 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500">

        <input
          type="file"
          multiple
          onChange={handleChange}
          className="hidden"
        />

        <p className="text-gray-600">
          Click to Upload or Drag & Drop Images
        </p>

        <p className="text-sm text-gray-400 mt-2">
          Supports single & batch upload
        </p>

      </label>

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mt-4 text-sm text-gray-700">
          {files.length} file(s) selected
        </div>
      )}

      {/* Predict Button */}
      <button
        onClick={handlePredict}
        className="mt-6 w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800"
      >
        Verify Identity
      </button>

    </div>
  );
}

export default Upload;