import { Hash, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@clerk/clerk-react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Travel",
    "Food",
    "Education",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const prompt = `Generate 5 SEO friendly blog titles for the keyword ${input}
       in the category ${selectedCategory}. Return as a numbered list.`;
      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
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
          <span className="gradient-text">Blog Title Generator</span>
        </h1>
        <p className="text-text-secondary text-lg">
          Generate SEO-friendly blog titles with AI
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
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Configuration</h2>
          </div>

          <label className="block mb-2 text-sm font-medium text-text-primary">
            Keyword
          </label>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="w-full px-4 py-3 glass rounded-[var(--radius-md)] text-text-primary placeholder-text-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
            placeholder="AI technology trends..."
            required
          />

          <label className="block mt-6 mb-3 text-sm font-medium text-text-primary">
            Category
          </label>
          <div className="flex gap-2 flex-wrap">
            {blogCategories.map((item) => (
              <motion.span
                key={item}
                onClick={() => setSelectedCategory(item)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`text-xs px-4 py-2 border rounded-full cursor-pointer transition-all duration-200 ${
                  selectedCategory === item
                    ? "gradient-primary text-white border-transparent"
                    : "text-text-secondary border-border hover:border-primary/60"
                }`}
              >
                {item}
              </motion.span>
            ))}
          </div>

          <motion.button
            disabled={loading}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex justify-center items-center gap-2 gradient-primary text-text-primary px-4 py-3 mt-8 text-sm font-medium rounded-lg cursor-pointer transition-all duration-300 hover:glow-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
            ) : (
              <Hash className="w-5 h-5" />
            )}
            {loading ? "Generating..." : "Generate Titles"}
          </motion.button>
        </motion.form>

        {/* Right Column - Output */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-lg glass rounded-[var(--radius-lg)] p-6 border border-border min-h-96 flex flex-col"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
              <Hash className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Generated Titles</h2>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center flex flex-col items-center gap-5"
              >
                <Hash className="w-12 h-12 text-text-secondary" />
                <p className="text-text-secondary text-sm">
                  Enter a keyword and click "Generate Titles" to get started
                </p>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 h-full overflow-y-scroll text-sm text-text-secondary"
            >
              <div className="reset-tw">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BlogTitles;
