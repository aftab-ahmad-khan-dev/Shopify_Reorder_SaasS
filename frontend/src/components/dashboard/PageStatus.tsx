import React from "react";
import { MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PageStatusProps {
  status: "active" | "inactive";
  location: string;
  lastUpdated: string;
}

export const PageStatus: React.FC<PageStatusProps> = ({
  status,
  location,
  lastUpdated,
}) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-[#11131a] border border-[#1e212b] p-4 rounded-xl">
      
      {/* Status */}
      <div className="flex items-center gap-3">
        <div
          className={`w-2 h-2 rounded-full ${
            status === "active"
              ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              : "bg-gray-600"
          }`}
        />
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            {t.overview.status.label}
          </p>
          <p className="text-sm font-medium text-white">
            {status === "active"
              ? t.overview.status.active
              : t.overview.status.inactive}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-3 md:border-x border-[#1e212b] md:px-4">
        <MapPin size={16} className="text-gray-500" />
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            {t.overview.location.label}
          </p>
          <p className="text-sm font-medium text-white truncate">
            {location}
          </p>
        </div>
      </div>

      {/* Last Updated */}
      <div className="flex items-center gap-3">
        <Clock size={16} className="text-gray-500" />
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
            {t.overview.lastUpdated.label}
          </p>
          <p className="text-sm font-medium text-white">
            {lastUpdated}
          </p>
        </div>
      </div>
    </div>
  );
};
