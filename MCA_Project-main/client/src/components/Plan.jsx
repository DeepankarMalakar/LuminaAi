import React from "react";
import { PricingTable } from '@clerk/clerk-react'

const ENABLE_BILLING = import.meta.env.VITE_ENABLE_BILLING === 'true';

const Plan = () => {
  return (
    <div className="max-w-2xl mx-auto z-20 my-30">

      <div className="text-center">
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Choose your plan
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      <div className="mt-14 max-sm:mx-8">
        {ENABLE_BILLING ? (
          <PricingTable />
        ) : (
          <div className="p-6 bg-white rounded-lg shadow-sm text-center">
            <p className="text-gray-600">
              Billing is disabled for this environment. To preview the pricing
              table enable billing in Clerk or set `VITE_ENABLE_BILLING=true`.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;
