// components/product/edit-product.tsx
import { useEffect, useState } from "react";
import { NEXT_PUBLIC_BACKEND_BASE_URL } from "@/constant";
import { toast } from "sonner";
import { ProductType } from "./product-table";

interface EditProductsProps {
  selectedProduct: ProductType | null;
  onEditSuccess: (updatedProduct: ProductType) => void;
}

const EditProducts = ({ selectedProduct, onEditSuccess }: EditProductsProps) => {
  const [form, setForm] = useState<ProductType | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setForm(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) =>
      prev && {
        ...prev,
        [name]: name === "price" || name === "rating" ? Number(value) : value,
      }
    );
  };

  const handleSubmit = async () => {
    if (!form) return;

    try {
      const res = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/products/${form.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to update product");

      const data: ProductType = await res.json();
      toast.success("Product updated!");
      onEditSuccess(data);
      setShow(false);
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  if (!selectedProduct) return null;

  return (
    <>
      <div
        className="hover:bg-green-700 bg-green-600 px-2 py-1 text-white rounded-md cursor-pointer flex items-center gap-2"
        onClick={() => setShow(true)}
      >
        Edit product
      </div>

      {show && form && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md w-full max-w-md space-y-4 shadow-xl">
            <h3 className="text-lg font-semibold">Edit Product</h3>
            <input name="name" value={form.name} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            <input name="description" value={form.description} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            <input name="category" value={form.category} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            <input name="price" type="number" value={form.price} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            <input name="rating" type="number" value={form.rating} onChange={handleChange} className="border rounded px-2 py-1 w-full" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShow(false)} className="px-4 py-1 rounded border">Cancel</button>
              <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProducts;

