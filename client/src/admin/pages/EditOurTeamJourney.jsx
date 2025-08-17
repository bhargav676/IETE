import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import apiClient from "../../apiClient";
import { FiTrash2, FiArrowLeft, FiLoader, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

const EditOurTeamJourney = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await apiClient.get("/our-team-journey");
      setImages(res.data.data || []);
    } catch (err) {
      setError("Failed to fetch images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    
    setDeletingId(id);
    try {
      await apiClient.delete(`/our-team-journey/${id}`);
      setSuccess("Image deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
      fetchImages();
    } catch (err) {
      setError("Failed to delete image. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <FiLoader className="animate-spin text-4xl text-blue-600 mb-4" />
        <p className="text-lg text-gray-600">Loading journey images...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Team Journey Gallery</h1>
            <p className="text-gray-600 mt-2">Manage your team's journey photos</p>
          </div>
          
          <Link
            to="/admin/our-team-journey"
            className="mt-4 md:mt-0 flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Back to Upload
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200 flex items-start">
            <FiAlertCircle className="text-red-500 text-xl mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-red-800">Error</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200 flex items-start">
            <FiCheckCircle className="text-green-500 text-xl mr-3 mt-0.5" />
            <div>
              <h3 className="font-medium text-green-800">Success</h3>
              <p className="text-green-600">{success}</p>
            </div>
          </div>
        )}

        {images.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <img 
              src="/empty-state.svg" 
              alt="No images" 
              className="mx-auto w-48 h-48 mb-4 opacity-70"
            />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Journey Images Found</h3>
            <p className="text-gray-500 mb-4">Upload some images to showcase your team's journey</p>
            <Link
              to="/admin/our-team-journey"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Upload Images
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((img) => (
              <div
                key={img._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition duration-200 relative group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={img.url}
                    alt="Journey"
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                    <span className="text-white font-medium truncate">{img.originalName || "Journey Photo"}</span>
                  </div>
                </div>
                <div className="p-4">
                  <button
                    onClick={() => handleDelete(img._id)}
                    disabled={deletingId === img._id}
                    className="w-full flex items-center justify-center py-2 px-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-md transition duration-200"
                  >
                    {deletingId === img._id ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Deleting...
                      </>
                    ) : (
                      <>
                        <FiTrash2 className="mr-2" />
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditOurTeamJourney;