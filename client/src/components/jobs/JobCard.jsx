import React from "react";

const JobCard = ({ title, company, daysAgo }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex gap-3">
        {/* Company Logo Placeholder */}
        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
          <span className="text-gray-400">🏢</span>
        </div>

        {/* Job Details */}
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{company}</p>
          <p className="text-xs text-gray-500 mt-2">נוסף לפני {daysAgo} ימים</p>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
