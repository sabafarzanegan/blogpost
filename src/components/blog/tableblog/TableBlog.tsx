import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { post } from "../../../lib/Type";
import "./tableblog.css";
import { BiEdit, BiTrash } from "react-icons/bi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Poststore } from "../../../store/Poststore";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const TableBlog = ({ data }: { data: post[] }) => {
  const queryClient = useQueryClient();
  const { deletPostHandler } = Poststore((state) => state);
  const { mutate, isPending } = useMutation({
    mutationKey: ["deletpost"],
    mutationFn: deletPostHandler,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("با موفقیت حذف شد");
        queryClient.invalidateQueries("adminposts" as any);
      }
    },
  });
  const columns: ColumnDef<post>[] = [
    {
      accessorKey: "img",
      header: "تصویر",
      cell: (info) => (
        <img
          src={info.getValue() as string}
          alt="Profile"
          style={{ width: 40, height: 40, borderRadius: "5%" }}
        />
      ),
    },
    {
      accessorKey: "title",
      header: "عنوان",
      cell: (info) => (
        <span style={{ textAlign: "right", fontSize: "14px" }}>
          {info.getValue() as string}
        </span>
      ),
    },

    {
      id: "actions",
      header: "عملیات",
      cell: ({ row }) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}>
          <Link to={`/dashboard/edit/${row.original.id}`}>
            <button style={{ backgroundColor: "green" }}>
              <BiEdit />
            </button>
          </Link>
          <button
            disabled={isPending}
            onClick={() => handleDelete(row.original.id)}>
            {isPending ? (
              <div className="center">
                <div className="loader" style={{ width: "20px" }}></div>
              </div>
            ) : (
              <BiTrash />
            )}
          </button>
        </div>
      ),
    },
  ];

  const handleDelete = (id: number) => {
    console.log("Deleting:", id);
    mutate(id);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <table style={{ width: "100%" }}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr style={{ padding: "10px" }} key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBlog;
