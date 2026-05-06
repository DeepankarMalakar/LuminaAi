import React, { useState } from "react";
import { Edit, Sparkle } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;
      const { data } = await axios.post(
        "/api/ai/generate-article",
        {
          prompt,
          length: selectedLength.length,
        },
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">Write Article</span>
        </h1>
        <p className="text-text-secondary text-lg">
          Generate high-quality articles with AI assistance
        </p>
      </div>

      <div className="flex items-start flex-wrap gap-6">
        {/* Left Column - Configuration */}
        <form
          onSubmit={onSubmitHandler}
          className="w-full max-w-lg glass rounded-[var(--radius-lg)] p-6 border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkle className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Article Configuration</h2>
          </div>

          <label className="block mb-2 text-sm font-medium text-text-primary">
            Article Topic
          </label>
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            className="w-full px-4 py-3 glass rounded-[var(--radius-md)] text-text-primary placeholder-text-secondary border border-border focus:outline-none focus:ring-2 focus:ring-primary/60 transition"
            placeholder="The future of AI is..."
            required
          />

          <label className="block mt-6 mb-3 text-sm font-medium text-text-primary">
            Article Length
          </label>
          <div className="flex gap-3 flex-wrap">
            {articleLength.map((item, index) => (
              <span
                onClick={() => setSelectedLength(item)}
                className={`text-xs px-4 py-2 border rounded-full cursor-pointer transition-all duration-200 ${
                  selectedLength.text === item.text
                    ? "gradient-primary text-white border-transparent"
                    : "text-text-secondary border-border hover:border-primary/60"
                }`}
                key={index}
              >
                {item.text}
              </span>
            ))}
          </div>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 gradient-primary text-text-primary px-4 py-3 mt-8 text-sm font-medium rounded-lg cursor-pointer transition-all duration-300 hover:scale-103 hover:glow-primary active:scale-97 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
            ) : (
              <Edit className="w-5 h-5" />
            )}
            {loading ? "Generating..." : "Generate Article"}
          </button>
        </form>

        {/* Right Column - Output */}
        <div className="w-full max-w-lg glass rounded-[var(--radius-lg)] p-6 border border-border min-h-96 max-h-[600px] flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
              <Edit className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">Generated Article</h2>
          </div>

          {!content ? (
            <div className="flex-1 flex justify-center items-center">
              <div className="text-center flex flex-col items-center gap-5">
                <Edit className="w-12 h-12 text-text-secondary" />
                <p className="text-text-secondary text-sm">
                  Enter a topic and click "Generate Article" to get started
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-text-secondary">
              <div className="reset-tw">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
