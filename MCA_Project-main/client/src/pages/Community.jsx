import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Heart, Users } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        },
      );

      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="h-full overflow-y-auto p-6 bg-bg-base">
      {/* Page Header with Animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold">
            <span className="gradient-text">Community Gallery</span>
          </h1>
        </div>
        <p className="text-text-secondary text-lg">
          Explore amazing AI-generated creations from our community
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-96"
          >
            <div className="flex flex-col items-center gap-4">
              <span className="w-12 h-12 rounded-full border-3 border-primary border-t-transparent animate-spin"></span>
              <p className="text-text-secondary">Loading community creations...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="glass rounded-[var(--radius-lg)] border border-border p-6 min-h-96"
          >
            {creations.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-96 gap-4"
              >
                <Users className="w-16 h-16 text-text-secondary" />
                <p className="text-text-secondary text-lg">No community creations yet</p>
                <p className="text-text-secondary text-sm">Be the first to share your creation!</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {creations.map((creation, index) => (
                  <motion.div
                    key={creation.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="relative group rounded-lg overflow-hidden border border-border hover:border-primary/60 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="aspect-square overflow-hidden"
                    >
                      <img
                        src={creation.content}
                        alt={creation.prompt || "Community creation"}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black/90 flex flex-col justify-end p-4 transition-opacity duration-300"
                    >
                      <p className="text-white text-sm mb-3 line-clamp-2">
                        {creation.prompt}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <motion.button
                            onClick={() => imageLikeToggle(creation.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="flex items-center gap-1 px-3 py-1.5 glass rounded-full border border-border hover:border-primary/60 transition-all"
                          >
                            <Heart
                              className={`w-4 h-4 transition-all ${
                                creation.likes.includes(user.id)
                                  ? "fill-red-500 text-red-500"
                                  : "text-white"
                              }`}
                            />
                            <span className="text-white text-xs font-medium">
                              {creation.likes.length}
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;
