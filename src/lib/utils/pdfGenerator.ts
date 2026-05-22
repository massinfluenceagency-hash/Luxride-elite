import { QuoteResult } from "@/types/quote";
import { formatCurrency } from "./formatCurrency";

export async function generateQuotePDF(result: QuoteResult): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();

  // Header background
  doc.setFillColor(10, 10, 10);
  doc.rect(0, 0, pageW, 50, "F");

  // Logo text
  doc.setTextColor(201, 167, 101);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("LuxRide Elite", 20, 25);

  doc.setFontSize(10);
  doc.setTextColor(180, 160, 120);
  doc.text("WHERE LUXURY MEETS THE ROAD", 20, 33);
  doc.text("Miami, FL | (305) 555-1234 | info@luxrideelite.com", 20, 40);

  // Quote ID and date
  doc.setTextColor(201, 167, 101);
  doc.setFontSize(10);
  doc.text(`Quote: ${result.quoteId}`, pageW - 20, 22, { align: "right" });
  doc.setTextColor(180, 160, 120);
  doc.text(`Valid until: ${result.validUntil.toLocaleDateString()}`, pageW - 20, 30, { align: "right" });

  // Divider
  doc.setDrawColor(201, 167, 101);
  doc.setLineWidth(0.5);
  doc.line(20, 55, pageW - 20, 55);

  // Trip Details
  doc.setTextColor(40, 40, 40);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Trip Details", 20, 68);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(80, 80, 80);
  const details = [
    ["Vehicle:", result.vehicleName],
    ["Service Type:", result.serviceType],
    ["Pickup:", result.origin],
    ["Dropoff:", result.destination],
    ["Distance:", `${result.distanceMiles.toFixed(1)} miles`],
    ["Duration:", `${result.durationHours} hours`],
    ["Passengers:", String(result.passengerCount)],
    ["Date:", result.date.toLocaleDateString()],
  ];

  details.forEach(([label, value], i) => {
    const y = 78 + i * 8;
    doc.setFont("helvetica", "bold");
    doc.text(label, 20, y);
    doc.setFont("helvetica", "normal");
    doc.text(value, 70, y);
  });

  // Price Breakdown table
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 40);
  doc.text("Price Breakdown", 20, 155);

  const tableRows = result.breakdown.map((item) => [item.label, formatCurrency(item.amount)]);

  autoTable(doc, {
    startY: 160,
    head: [["Description", "Amount"]],
    body: tableRows,
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [10, 10, 10], textColor: [201, 167, 101], fontStyle: "bold" },
    columnStyles: { 1: { halign: "right" } },
    alternateRowStyles: { fillColor: [248, 246, 242] },
  });

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text("© LuxRide Elite | luxrideelite.com | Available 24/7", pageW / 2, footerY, { align: "center" });
  doc.text("This quote is valid for 48 hours from the date of issue.", pageW / 2, footerY + 5, { align: "center" });

  doc.save(`LuxRide-Quote-${result.quoteId}.pdf`);
}
