import "svg2pdf.js";
import Papa from "papaparse";

export const downloadCSV = (args) => {
    let filename = args.filename || "export.csv";

    let csv = Papa.unparse(args.data);
    if (csv == null) return;

    var blob = new Blob([csv]);

    var a = window.document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = filename;
    document.body.appendChild(a);
    a.click(); // IE: "Access is denied"; see: https://connect.microsoft.com/IE/feedback/details/797361/ie-10-treats-blob-url-as-cross-origin-and-denies-access
    document.body.removeChild(a);
};