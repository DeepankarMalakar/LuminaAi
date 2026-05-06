import { FileText, Sparkles, Upload } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(file);
      setFileName(file.name);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("resume", input);

      const { data } = await axios.post("/api/ai/resume-review", formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

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
          <span className="gradient-text">Resume Reviewer</span>
        </h1>
        <p className="text-text-secondary text-lg">
          Get AI-powered feedback and insights on your resume
        </p>
      </motion.div>

      <div className="flex items-start flex-wrap gap-6">
        {/* Left Column - Upload */}
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg glass rounded-[var(--radius-lg)] p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#10B981] to-[#06B6D4] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Upload Resume</h2>
          </div>

          <label className="block w-full p-8 glass rounded-[var(--radius-lg)] border-2 border-dashed border-border hover:border-primary/60 hover:glow-border-primary transition-all duration-300 cursor-pointer text-center group">
            <input
              type="file"
              accept="application/pdf"
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
                Click to upload your resume
              </p>
              <p className="text-text-secondary text-sm">
                PDF format only, up to 10MB
              </p>
            </motion.div>
          </label>

          {fileName && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-4 p-4 glass rounded-lg border border-border flex items-center gap-3"
            >
              <FileText className="w-5 h-5 text-primary" />
              <p className="text-text-primary text-sm flex-1 truncate">{fileName}</p>
            </motion.div>
          )}

          <motion.button
            disabled={loading || !input}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-text-primary px-4 py-3 mt-6 text-sm font-medium rounded-lg cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
            ) : (
              <FileText className="w-5 h-5" />
            )}
            {loading ? "Analyzing..." : "Review Resume"}
          </motion.button>
        </motion.form>

        {/* Right Column - Result */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-lg glass rounded-[var(--radius-lg)] p-6 border border-border min-h-96 max-h-[600px] flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#06B6D4] to-[#10B981] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Analysis Result</h2>
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
                      y: [0, -10, 0],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <FileText className="w-12 h-12 text-text-secondary" />
                  </motion.div>
                  <p className="text-text-secondary text-sm">
                    Upload a PDF resume and click "Review Resume" to get started
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
                className="mt-3 h-full overflow-y-auto text-sm text-text-secondary prose prose-invert prose-sm max-w-none"
              >
                <ReactMarkdown>{content}</ReactMarkdown>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewResume;
