import React, { useState } from "react";

const AddJobForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    position: "",
    status: "נשמר",
    applicationDate: "",
    notes: "",
  });

  const [errors, setErrors] = useState({
    companyName: "",
    position: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "חובה למלא את שם החברה";
    }

    if (!formData.position.trim()) {
      newErrors.position = "חובה למלא תפקיד";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">הוספת משרה חדשה</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">שם החברה</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${
                errors.companyName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">תפקיד</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className={`w-full p-2 border rounded-lg ${
                errors.position ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.position && (
              <p className="text-red-500 text-sm mt-1">{errors.position}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">סטטוס</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="נשמר">נשמר</option>
              <option value="הוגש">הוגש</option>
              <option value="בראיונות">בראיונות</option>
              <option value="הצעה">הצעה</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">תאריך הגשה</label>
            <input
              type="date"
              name="applicationDate"
              value={formData.applicationDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">הערות</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg h-24"
              placeholder="הוסף הערות..."
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              ביטול
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              הוסף משרה
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJobForm;
