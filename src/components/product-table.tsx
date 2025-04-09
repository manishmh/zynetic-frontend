import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export interface ProductType {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
}

interface ProductTableProps {
  products: ProductType[];
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}

const ProductTable = ({
  products,
  currentPage,
  totalPages,
  onPrev,
  onNext,
  selectedId,
  setSelectedId,
}: ProductTableProps) => {
  return (
    <div className="overflow-x-scroll">
      <table className="min-w-full table-fixed border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-1/6 border-r py-2 px-4 text-left">Name</th>
            <th className="w-1/3 border-r py-2 px-4 text-left">Description</th>
            <th className="w-1/12 border-r py-2 px-4 text-left">Category</th>
            <th className="w-1/12 border-r py-2 px-4 text-left">Price</th>
            <th className="w-1/12 py-2 px-4 text-left">Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className={` cursor-pointer ${selectedId === product.id && "bg-blue-100"}`}
              onClick={() =>
                setSelectedId(selectedId === product.id ? null : product.id)
              }
            >
              <td className="py-2 px-4 truncate">{product.name}</td>
              <td className="py-2 px-4 truncate">{product.description}</td>
              <td className="py-2 px-4">{product.category}</td>
              <td className="py-2 px-4">${product.price.toFixed(2)}</td>
              <td className="py-2 px-4">{product.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="lg:border lg:border-t-0 border-gray-300 flex items-center px-4 py-3 justify-center w-full">
        <div className="flex items-center gap-4 text-gray-600 font-mono">
          <button
            className="text-sm py-2 px-4 hover:bg-gray-200 rounded-md disabled:opacity-40"
            onClick={onPrev}
            disabled={currentPage === 1}
          >
            <FaChevronLeft />
          </button>
          <span>
            Page <strong>{currentPage}</strong> of{" "}
            <strong>{totalPages || 1}</strong>
          </span>
          <button
            className="text-sm py-2 px-4 hover:bg-gray-200 rounded-md disabled:opacity-40"
            onClick={onNext}
            disabled={currentPage === totalPages}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
