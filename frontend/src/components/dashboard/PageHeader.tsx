import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  plan: "Starter" | "Growth";
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  plan,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          {title}
        </h1>

        <span
          className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest ${
            plan === "Starter"
              ? "bg-gray-700 text-gray-300"
              : "bg-purple-900 text-purple-300"
          }`}
        >
          {plan}
        </span>
      </div>

      <p className="text-sm text-gray-500 max-w-3xl">
        {description}
      </p>
    </div>
  );
};
