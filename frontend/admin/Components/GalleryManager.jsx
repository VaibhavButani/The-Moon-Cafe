import { useState, useEffect, useRef } from "react";
import axios from "axios";
import API_BASE from "../../src/config";

export default function GalleryManager() {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState([]);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/gallery`);
      setImages(res.data);
    } catch (err) {
      console.error("Error fetching images:", err);
    }
  };

  const handleFileSelect = (selectedFiles) => {
    setError("");
    const validFiles = [];
    let invalidFound = false;

    Array.from(selectedFiles).forEach((file) => {
      if (file.type.startsWith("image/")) {
        validFiles.push(file);
      } else {
        invalidFound = true;
      }
    });

    if (invalidFound) {
      setError("❌ Only image files are allowed (jpg, png, gif, etc.)");
    }

    setFiles((prev) => [...prev, ...validFiles]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE}/api/gallery`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages((prev) => [...prev, ...res.data]);
      setFiles([]);
    } catch (err) {
      console.error("Error uploading images:", err);
      setError("❌ Failed to upload images. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selected.length === 0) return;
    if (!window.confirm("Are you sure you want to delete selected images?"))
      return;

    try {
      for (const filename of selected) {
        await axios.delete(
          `${API_BASE}/api/gallery/${encodeURIComponent(filename)}`
        );
      }
      setImages((prev) => prev.filter((img) => !selected.includes(img.filename)));
      setSelected([]);
    } catch (err) {
      console.error("Error deleting images:", err);
      setError("❌ Failed to delete some images.");
    }
  };

  const toggleSelect = (filename) => {
    setSelected((prev) =>
      prev.includes(filename)
        ? prev.filter((f) => f !== filename)
        : [...prev, filename]
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  return (
    <div className="p-6 bg-[#e2dbcd] min-h-screen">
      <h2 className="text-2xl font-bold mb-4 text-[#3d2f23]">
        Gallery Manager
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded">
          {error}
        </div>
      )}

      {/* Upload Area */}
      <form onSubmit={handleUpload} className="mb-6">
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition ${
            dragging
              ? "bg-[#d7bd6a] border-[#3d2f23]"
              : "border-[#3d2f23] hover:border-[#957d49]"
          }`}
        >
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
          <p className="text-[#3d2f23] font-semibold">
            {dragging ? "🚀 Drop images here!" : "📂 Click or drag images here"}
          </p>
        </div>

        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2 text-[#3d2f23]">
              Preview before upload:
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="relative border rounded overflow-hidden group border-[#3d2f23]"
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-full h-32 object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFiles((prev) => prev.filter((_, i) => i !== index))
                    }
                    className="absolute top-1 right-1 bg-[#3d2f23] bg-opacity-70 text-white px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`mt-4 px-6 py-2 rounded font-semibold text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#453423] hover:bg-[#957d49] hover:scale-105 transition-all duration-300"
              }`}
            >
              {loading ? "Uploading..." : "Upload All"}
            </button>
          </div>
        )}
      </form>

      {selected.length > 0 && (
        <div className="mb-4">
          <button
            onClick={handleDeleteSelected}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            🗑 Delete Selected ({selected.length})
          </button>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => {
          const isSelected = selected.includes(img.filename);
          return (
            <div
              key={img.id || img.filename}
              onClick={() => toggleSelect(img.filename)} // ✅ click on image toggles selection
              className={`relative rounded-lg overflow-hidden shadow cursor-pointer transition ${
                isSelected ? "border-4 border-red-600" : "border border-[#3d2f23]"
              }`}
            >
              <img
                src={`${API_BASE}/uploads/gallery/${img.filename}`}
                alt={img.filename}
                className="w-full h-48 object-cover"
              />
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelect(img.filename)}
                className="absolute top-2 right-2 w-5 h-5 cursor-pointer accent-red-600"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}