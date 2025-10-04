import React from "react";
import * as XLSX from "xlsx";

const FileUpload = ({ onDataLoaded }) => {
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    onDataLoaded(rows);
  };

  return (
    <div>
      <label><strong>Upload Excel:</strong></label>{" "}
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
    </div>
  );
};

export default FileUpload;
