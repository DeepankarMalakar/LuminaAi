import { Scissors, Sparkles, Upload, Download } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [preview, setPreview] = useState("");
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (object.split(" ").length > 1) {
        toast.error("Please enter only one object name");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } },
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-auto p-6 bg-bg-base">
      {/* Page Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Object Remover</span>
        </h1>
        <p className="text-text-secondary text-lg">
          Remove specific objects from images with AI precision
        </p>
      </motion.div>

      <div className="flex items-start flex-wrap gap-6">
        {/* Left Column - Upload & Configuration */}
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg glass rounded-[var(--radius-lg)] p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#F59E0B] to-[#10B981] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Configuration</h2>
          </div>

          <label className="block mb-2 text-sm font-medium text-text-primary">
            Upload Image
          </label>
          <label className="block w-full p-8 glass rounded-[var(--radius-lg)] border-2 border-dashed border-border hover:border-primary/60 hover:glow-border-primary transition-all duration-300 cursor-pointer text-center group">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              required
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center gap-3"
            >
              <Upload className="w-12 h-12 text-text-secondary group-hover:text-primary transition" />
              <p className="text-text-primary font-medium">
                Click to upload or drag and drop
              </p>
              <p className="text-text-secondary text-sm">
                PNG, JPG, WEBP up to 10MB
              </p>
            </motion.div>
          </label>

          {preview && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 rounded-lg overflow-hidden border border-border"
            >
              <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
            </motion.div>
          )}

          <label className="block mt-6 mb-2 text-sm font-medium text-text-primary">
            Describe Object to Remove
          </label>
          <textarea
            onChange={(e) => setObject(e.target.value)}
            value={object}
            rows={4}
            className="w-full px-4 py-3 glass rounded-[var(--radius-md)] text-text-primary placeholder-text-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/60 transition resize-none"
            placeholder="e.g. person, car, tree, building..."
            required
          />
          <p className="text-xs text-text-secondary mt-2">
            Enter a single object name for best results
          </p>

          <motion.button
            disabled={loading || !input}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F59E0B] to-[#10B981] text-text-primary px-4 py-3 mt-6 text-sm font-medium rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
            ) : (
              <Scissors className="w-5 h-5" />
            )}
            {loading ? "Processing..." : "Remove Object"}
          </motion.button>
        </motion.form>

        {/* Right Column - Result */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-lg glass rounded-[var(--radius-lg)] p-6 border border-border min-h-96 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#10B981] to-[#F59E0B] flex items-center justify-center">
                <Scissors className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-text-primary">Processed Image</h2>
            </div>
            {content && (
              <motion.a
                href={content}
                download
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 glass rounded-lg border border-border hover:border-primary/60 transition-all"
              >
                <Download className="w-5 h-5 text-text-primary" />
              </motion.a>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!content ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex justify-center items-center"
              >
                <div className="text-center flex flex-col items-center gap-5">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 15, -15, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Scissors className="w-12 h-12 text-text-secondary" />
                  </motion.div>
                  <p className="text-text-secondary text-sm">
                    Upload an image and describe the object to remove
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="mt-3 h-full rounded-lg overflow-hidden border border-border bg-gradient-to-br from-bg-card/50 to-bg-surface/50"
                style={{
                  backgroundImage: 'repeating-conic-gradient(rgba(255,255,255,0.05) 0% 25%, transparent 0% 50%) 50% / 20px 20px'
                }}
              >
                <img
                  src={content}
                  alt="Processed"
                  className="w-full h-full object-contain"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default RemoveObject;
