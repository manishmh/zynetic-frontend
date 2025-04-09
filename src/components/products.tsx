import { NEXT_PUBLIC_BACKEND_BASE_URL } from "@/constant";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import AddProductModal from "./add-product";
import DeleteTableRow from "./delete-table-row";
import EditProducts from "./edit-product";
import ProductTable from "./product-table";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const pageSize = 2;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${NEXT_PUBLIC_BACKEND_BASE_URL}/products`, {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / pageSize);
  const currentProducts = products.slice(
    (pagination - 1) * pageSize,
    pagination * pageSize
  );

  const handlePrev = () => setPagination((prev) => Math.max(1, prev - 1));
  const handleNext = () =>
    setPagination((prev) => Math.min(totalPages, prev + 1));

  const handleAddProduct = (newProduct: Product) => {
    setProducts((prev) => [newProduct, ...prev]);
    setPagination(1);
  };

  const handleDeleteSuccess = (deletedId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== deletedId));
    setSelectedId(null);
  };

  return (
    <div className="px-6 rounded-md relative">
      <div className="flex w-full justify-between items-center gap-4 mb-4">
        <div>
          <h2 className="text-xl font-semibold ml-auto">Product List</h2>
        </div>
        <div className="flex items-center gap-4">
          <EditProducts
            selectedProduct={products.find((p) => p.id === selectedId) || null}
            onEditSuccess={(updatedProduct) => {
              setProducts((prev) =>
                prev.map((p) =>
                  p.id === updatedProduct.id ? updatedProduct : p
                )
              );
              setSelectedId(null);
            }}
          />

          <DeleteTableRow
            selectedId={selectedId}
            onDeleteSuccess={handleDeleteSuccess}
          />
          <div
            className="hover:bg-gray-300 bg-gray-200 p-2 rounded-md cursor-pointer flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            Add product
            <FaPlus />
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <ProductTable
          products={currentProducts}
          currentPage={pagination}
          totalPages={totalPages}
          onPrev={handlePrev}
          onNext={handleNext}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      )}

      {showForm && (
        <AddProductModal
          onClose={() => setShowForm(false)}
          onAdd={handleAddProduct}
        />
      )}
    </div>
  );
};

export default Products;
