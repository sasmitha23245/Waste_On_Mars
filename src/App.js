import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Dropdowns from "./components/Dropdowns";
import Results from "./components/Results";
import './App.css';


function App() {
  const [data, setData] = useState({});
  const [rawData, setRawData] = useState([]);
  const [selection, setSelection] = useState({ 
    category: "", 
    subcategory: ""
  });
  const [weight, setWeight] = useState(0);

  // Build nested structure: Category → Subcategory → Array of Materials
  const buildNested = (rows) => {
    const nested = {};
    rows.forEach((r, index) => {
      const cat = r.Category?.trim() || "";
      const sub = r.Subcategory?.trim() || "";
      const material = r.MaterialName?.trim() || "";

      if (!cat || !sub || !material) {
        console.warn(`Skipping row ${index + 2}: missing Category, Subcategory, or MaterialName`);
        return;
      }

      // Initialize category if it doesn't exist
      nested[cat] = nested[cat] || {};
      // Initialize subcategory if it doesn't exist
      nested[cat][sub] = nested[cat][sub] || [];
      // Add the material data to the subcategory
      nested[cat][sub].push(r);
    });
    return nested;
  };

  // Handle Excel data loaded from FileUpload
  const handleDataLoaded = (rows) => {
    setRawData(rows);
    setData(buildNested(rows));
    setSelection({ category: "", subcategory: "" });
    setWeight(0);
  };

  // Handle dropdown selections
  const handleSelect = (type, value) => {
    if (type === "category") {
      setSelection({ category: value, subcategory: "" });
      setWeight(0);
    } else if (type === "subcategory") {
      setSelection((prev) => ({ ...prev, subcategory: value }));
      setWeight(0);
    }
  };

  // Prepare dropdown data
  const categories = Object.keys(data);
  const subcategories = selection.category ? Object.keys(data[selection.category] || {}) : [];
  
  // Get ALL materials for the selected subcategory
  const subcategoryMaterials = selection.category && selection.subcategory 
    ? data[selection.category][selection.subcategory] 
    : [];

  return (
    <div className="app-container">
    <div style={{ padding: "20px" }}>
      <h1>♻️ Waste Recycling UI</h1>

      {/* Upload Excel */}
      <FileUpload onDataLoaded={handleDataLoaded} />

      {/* Dropdowns */}
      <Dropdowns
        categories={categories}
        subcategories={subcategories}
        onSelect={handleSelect}
        selection={selection}
      />

      {/* Selected info display */}
      <div style={{ marginTop: "16px" }}>
        <strong>Selected Category:</strong> {selection.category || "-"} <br />
        <strong>Selected Subcategory:</strong> {selection.subcategory || "-"}
      </div>

      {/* Weight Input - Show only when subcategory is selected */}
      {selection.subcategory && (
        <div style={{ margin: "16px 0" }}>
          <label>
            <strong>Enter Total Weight for {selection.subcategory} (kg): </strong>
            <input 
              type="number" 
              value={weight} 
              onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
              style={{ marginLeft: "8px", padding: "4px" }}
              min="0"
              step="0.1"
            />
          </label>
        </div>
      )}

      {/* Results - Show ALL materials for the selected subcategory */}
      {selection.subcategory && subcategoryMaterials.length > 0 && (
        <Results 
          materials={subcategoryMaterials}
          weight={weight}
          subcategory={selection.subcategory}
        />
      )}

      {/* Debug Info */}
      <div style={{ 
        marginTop: "20px", 
        padding: "10px", 
        background: "#f5f5f5", 
        fontSize: "12px" 
      }}>
        <strong>Debug Info:</strong><br />
        Categories: {categories.join(", ")}<br />
        Selected: {selection.category} → {selection.subcategory}<br />
        Materials Found: {subcategoryMaterials.length}<br />
        Total Rows Loaded: {rawData.length}
      </div>
    </div>
    </div>
  );
}

export default App;