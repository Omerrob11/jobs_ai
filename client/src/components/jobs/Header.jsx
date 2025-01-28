import React from "react";

const KanbanHeader = ({ onAddJob }) => {
  return (
    <div className="flex items-center justify-between mb-8" dir="rtl">
      <h1 className="text-2xl font-bold text-gray-900">חיפוש עבודה 2025</h1>

      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="חיפוש..."
            className="w-96 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Buttons */}
        <button className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50">
          סינון
        </button>

        <button
          onClick={onAddJob}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <span>+</span>
          הוספת משרה
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-full">⋮</button>
      </div>
    </div>
  );
};

export default KanbanHeader;
