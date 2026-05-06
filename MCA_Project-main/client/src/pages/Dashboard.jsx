import React, { useEffect, useState } from "react";
import { Gem, Sparkle } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
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

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      {/* Stat Cards */}
      <div className="flex justify-start gap-4 flex-wrap mb-8">
        {/* Total Creation Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 glass rounded-[var(--radius-lg)] border border-border transition-all duration-250 hover:-translate-y-1 hover:glow-border-primary">
          <div className="text-text-primary">
            <p className="text-sm font-medium text-text-secondary">Total Creation</p>
            <h2 className="text-2xl font-bold">{creations.length}</h2>
          </div>
          <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center">
            <Sparkle className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 glass rounded-[var(--radius-lg)] border border-border transition-all duration-250 hover:-translate-y-1 hover:glow-border-primary">
          <div className="text-text-primary">
            <p className="text-sm font-medium text-text-secondary">Active Plan</p>
            <h2 className="text-2xl font-bold">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
            <Gem className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-sm font-medium text-text-primary mb-4">Recent Creations</p>
          {creations.map((item) => (
            <CreationItem key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
