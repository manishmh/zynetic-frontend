import { NEXT_PUBLIC_BACKEND_BASE_URL } from "@/constant";
import { toast } from "sonner";

interface DeleteTableRowProps {
  selectedId: string | null;
  onDeleteSuccess: (deletedId: string) => void;
}

const DeleteTableRow = ({ selectedId, onDeleteSuccess }: DeleteTableRowProps) => {
  const handleDelete = async () => {
    if (!selectedId) return;

    try {
      const res = await fetch(
        `${NEXT_PUBLIC_BACKEND_BASE_URL}/products/${selectedId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) throw new Error("Failed to delete product");

      onDeleteSuccess(selectedId);
      toast.success("Product deleted successfully")
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  if (!selectedId) return null;

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md mr-4"
    >
      Delete
    </button>
  );
};

export default DeleteTableRow;
