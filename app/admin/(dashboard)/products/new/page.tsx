import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "2rem" }}>
        Yangi mahsulot
      </h1>
      <ProductForm />
    </div>
  );
}
