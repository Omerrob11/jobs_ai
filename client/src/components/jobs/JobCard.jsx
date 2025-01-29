import React from "react";
import { Pencil, Trash2 } from "lucide-react";

const JobCard = ({ title, company, daysAgo, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
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

        {/* Action Buttons */}
        <div className="flex gap-2 items-start">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
