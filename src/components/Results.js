import React from "react";
import './styles.css';


const Results = ({ materials, weight, subcategory }) => {
  return (
    <div style={{ 
      marginTop: "20px", 
      padding: "16px", 
      border: "1px solid #ddd", 
      borderRadius: "8px" 
    }}>
      <h2>Key Materials for {subcategory}</h2>
      <p><strong>Input Weight:</strong> {weight} kg</p>
      
      <div style={{ marginTop: "16px" }}>
        <h3>Material Breakdown</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Material Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Percentage</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Calculated Weight</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Moisture Content</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Item Mass %</th>
              <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>Item Volume %</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material, index) => {
              const calculatedWeight = weight > 0 
                ? (weight * (parseFloat(material.MaterialPct) || 0)).toFixed(2) 
                : "-";
              
              return (
                <tr key={index} style={{ border: "1px solid #ddd" }}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    <strong>{material.MaterialName}</strong>
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                    {(material.MaterialPct * 100).toFixed(1)}%
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                    {calculatedWeight} {weight > 0 ? "kg" : ""}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                    {(material["Approx. Moisture Content (%)"] * 100).toFixed(1)}%
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                    {(material["% of Item by Mass"] * 100).toFixed(1)}%
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                    {(material["% of Item by Volume"] * 100).toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Process Flow Information */}
      {/* Process Flow Information */}
{materials.length > 0 && (
  <div className="results-container">
    <h3>Process Information</h3>
    <p><strong>Total Mass:</strong> {materials[0]["Total Mass (kg)"]} kg</p>
    <p><strong>Total Volume:</strong> {materials[0]["Total Volume (m3)"]} m³</p>

    {/* Display process steps for each material */}
    {materials.map((material, index) => (
      <div key={index} className="material-process">
        <h4>{material.MaterialName}</h4>
        {material.ProcessSteps ? (
          <ol>
            {material.ProcessSteps.split(";").map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        ) : (
          <p>No process information available</p>
        )}
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default Results;
