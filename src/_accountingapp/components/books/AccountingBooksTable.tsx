import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"
import type { AccountingBookRow } from "@/_accountingapp/schemas/types/books/tables"
import { accountingBooksColumns } from "@/_accountingapp/schemas/types/books/tables"

interface AccountingBooksTableProps {
  data: AccountingBookRow[]
}

export function AccountingBooksTable({
  data,
}: AccountingBooksTableProps) {
  const table = useReactTable({
    data,
    columns: accountingBooksColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-lg border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left font-medium"
                >
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
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="border-t hover:bg-accent transition-colors"
            >
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3">
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}

          {data.length === 0 && (
            <tr>
              <td
                colSpan={accountingBooksColumns.length}
                className="px-4 py-6 text-center text-muted-foreground"
              >
                No accounting books found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
