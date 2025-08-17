import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import apiClient from "../../apiClient";

const OurTeamJourneyUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formSuccess, setFormSuccess] = useState(''); // NEW: Added for on-screen success message
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormSuccess(''); // Clear success message on new file selection
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image to upload"); // Retain alert for validation error
      return;
    }

    setLoading(true);
    setFormSuccess(''); // Clear any previous success message
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await apiClient.post("/our-team-journey/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormSuccess('Image uploaded successfully!'); // Set on-screen success message
      setTimeout(() => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setFormSuccess(''); // Clear success message after reset
      }, 3000); // Reset form after 3 seconds
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const primaryButtonBg = "bg-[#6367a7]";
  const primaryButtonHover = "hover:bg-custom-darker-violet";
  const primaryButtonFocusRing = "focus:ring-custom-violet";
  const bodyFontClass = "font-body";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md"
    >
      <motion.h1 
        className="text-3xl font-bold mb-6 text-gray-800"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        Our Team Journey
      </motion.h1>

      <div className="mb-8 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
        {formSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-emerald-50 border border-emerald-200 text-emerald-700 p-3 rounded-lg flex items-center mb-5 text-sm"
          >
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p className={`${bodyFontClass} font-medium`}>{formSuccess}</p>
          </motion.div>
        )}

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Upload Image
            </label>
            <div className="flex items-center gap-3">
              <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6367a7]">
                Choose File
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="sr-only"
                />
              </label>
              <span className="text-sm text-gray-500">
                {selectedFile ? selectedFile.name : "No file chosen"}
              </span>
            </div>
          </div>

          <motion.button
            onClick={handleUpload}
            className={`${primaryButtonBg} ${primaryButtonHover} text-white font-medium py-2 px-6 rounded-full focus:outline-none focus:ring-2 ${primaryButtonFocusRing} focus:ring-opacity-50 transition ease-in-out duration-200 shadow-md flex items-center justify-center ${bodyFontClass} ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            disabled={loading || !selectedFile}
            whileHover={{ scale: selectedFile && !loading ? 1.03 : 1 }}
            whileTap={{ scale: selectedFile && !loading ? 0.98 : 1 }}
            aria-busy={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg className="h-5 w-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Upload Image
              </>
            )}
          </motion.button>
        </div>

        <div className="mt-4">
          {previewUrl && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex flex-col items-center"
            >
              <img
                src={previewUrl}
                alt="Preview"
                className="max-h-60 rounded-md shadow-sm border border-gray-200"
              />
              <p className="mt-2 text-sm text-gray-500">
                {selectedFile?.size && `File size: ${Math.round(selectedFile.size / 1024)} KB`}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      <motion.div
        className="flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <button
          onClick={() => navigate("/admin/edit-our-team-journey")}
          className="flex items-center gap-2 px-6 py-2 bg-[#6367a7] hover:bg-custom-darker-violet text-white font-medium rounded-full shadow-sm transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
          Manage Journey
        </button>
      </motion.div>
    </motion.div>
  );
};

export default OurTeamJourneyUpload;