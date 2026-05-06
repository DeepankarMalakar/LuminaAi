import { Image, Sparkles, Download } from "lucide-react";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "3D style",
    "Portrait",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
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
          <span className="gradient-text">AI Image Generator</span>
        </h1>
        <p className="text-text-secondary text-lg">
          Create stunning images from text descriptions
        </p>
      </motion.div>

      <div className="flex items-start flex-wrap gap-6">
        {/* Left Column - Configuration */}
        <motion.form
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg glass rounded-[var(--radius-lg)] p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Configuration</h2>
          </div>

          <label className="block mb-2 text-sm font-medium text-text-primary">
            Describe your image
          </label>
          <textarea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={4}
            className="w-full px-4 py-3 glass rounded-[var(--radius-md)] text-text-primary placeholder-text-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/60 transition resize-none"
            placeholder="A futuristic city skyline at sunset with flying cars and neon lights..."
            required
          />

          <label className="block mt-6 mb-3 text-sm font-medium text-text-primary">
            Image Style
          </label>
          <div className="flex gap-2 flex-wrap">
            {imageStyle.map((item) => (
              <motion.span
                key={item}
                onClick={() => setSelectedStyle(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-xs px-4 py-2 border rounded-full cursor-pointer transition-all duration-200 ${
                  selectedStyle === item
                    ? "gradient-accent text-white border-transparent"
                    : "text-text-secondary border-border hover:border-accent/60"
                }`}
              >
                {item}
              </motion.span>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="my-6 flex items-center gap-3 glass rounded-lg p-3 border border-border"
          >
            <label className="relative cursor-pointer">
              <input
                type="checkbox"
                onChange={(e) => setPublish(e.target.checked)}
                checked={publish}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-border rounded-full peer-checked:bg-gradient-to-r peer-checked:from-primary peer-checked:to-accent transition-all duration-300"></div>
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-5"></span>
            </label>
            <p className="text-sm text-text-primary">Make this image public</p>
          </motion.div>

          <motion.button
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex justify-center items-center gap-2 gradient-accent text-text-primary px-4 py-3 mt-6 text-sm font-medium rounded-lg cursor-pointer transition-all duration-300 hover:glow-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
            ) : (
              <Image className="w-5 h-5" />
            )}
            {loading ? "Generating..." : "Generate Image"}
          </motion.button>
        </motion.form>

        {/* Right Column - Output */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-lg glass rounded-[var(--radius-lg)] p-6 border border-border min-h-96 flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                <Image className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-text-primary">Generated Image</h2>
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
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Image className="w-12 h-12 text-text-secondary" />
                  </motion.div>
                  <p className="text-text-secondary text-sm">
                    Describe your image and click "Generate Image" to create
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="image"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                className="mt-3 h-full rounded-lg overflow-hidden border border-border"
              >
                <img
                  src={content}
                  alt="Generated"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default GenerateImages;
