import React from "react";

const Dropdowns = ({ categories, subcategories, onSelect, selection }) => {
  return (
    <div style={{ margin: "16px 0" }}>
      {/* Category Dropdown */}
      <select 
        value={selection.category} 
        onChange={(e) => onSelect("category", e.target.value)}
        style={{ marginRight: "8px", padding: "4px" }}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Subcategory Dropdown */}
      <select 
        value={selection.subcategory} 
        onChange={(e) => onSelect("subcategory", e.target.value)}
        disabled={!selection.category}
        style={{ padding: "4px" }}
      >
        <option value="">Select Subcategory</option>
        {subcategories.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
  );
};

export default Dropdowns;