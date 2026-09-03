import { getProductById } from "@/lib/db/products";
import { notFound } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div>
      <h1 style={{ fontSize: "1.5rem", fontWeight: "700", color: "var(--color-primary)", marginBottom: "2rem" }}>
        {product.title_uz || product.slug}
      </h1>
      <ProductForm product={product} />
    </div>
  );
}
