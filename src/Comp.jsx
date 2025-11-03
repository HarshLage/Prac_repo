import React, { useRef } from "react";
import { saveAs } from "file-saver";

export default function ExportPage() {
  const contentRef = useRef(null);

  const handleExport = () => {
    if (!contentRef.current) return;

    // Get the HTML content from the ref
    const htmlContent = contentRef.current.innerHTML;

    console.log("this is the html content " , htmlContent);
    
    // Create a proper Word-compatible HTML document
    const fullHtml = `
      <!DOCTYPE html>
      <html xmlns:o="urn:schemas-microsoft-com:office:office" 
            xmlns:w="urn:schemas-microsoft-com:office:word">
      <head>
        <meta charset="UTF-8">
        <title>Report</title>
        <xml>
          <w:WordDocument>
            <w:View>Print</w:View>
            <w:Zoom>100</w:Zoom>
          </w:WordDocument>
        </xml>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            padding: 20px; 
          }
          h1 { 
            text-align: center; 
            color: #007bff; 
          }
          table { 
            border-collapse: collapse; 
            width: 100%; 
            margin-top: 15px; 
          }
          th, td { 
            border: 1px solid #000; 
            padding: 8px; 
            text-align: left; 
          }
          th { 
            background-color: #f2f2f2; 
          }
          @page {
            size: A4;
            margin: 2cm;
          }
        </style>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;

    try {
      // Create blob with proper MIME type
      const blob = new Blob([fullHtml], { 
        type: "application/msword;charset=utf-8" 
      });
      
      // Save the file
      saveAs(blob, `Report_${new Date().toISOString().split("T")[0]}.doc`);
    } catch (err) {
      console.error("Error exporting document:", err);
      alert("❌ Export failed. See console for details.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      {/* This div's content will be converted to Word */}
      <div ref={contentRef}>
        <h1>Monthly Sales Report</h1>
        <p>This report was generated directly from a React + Vite app.</p> 

        <table>
          <thead>
            <tr><th>Product</th><th>Units Sold</th><th>Revenue ($)</th></tr>
          </thead>
          <tbody>
            <tr><td>iPhone 15</td><td>120</td><td>120,000</td></tr>
            <tr><td>MacBook Air</td><td>75</td><td>90,000</td></tr>
          </tbody>
        </table>

        <p><b>Generated on:</b> {new Date().toLocaleDateString()}</p>
      </div>

      <button onClick={handleExport}>
        Export to Word
      </button>
    </div>
  );
}