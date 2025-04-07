import MaterialsSEOContent from "@/components/SEO/MaterialSEOContent";
import ProductGridSection from "../../../components/ProductGridSection";

export default function MaterialsPage() {
  return (
    <div className="flex justify-center">
      <MaterialsSEOContent />
      <ProductGridSection title="Materials" />
    </div>
  );
}
