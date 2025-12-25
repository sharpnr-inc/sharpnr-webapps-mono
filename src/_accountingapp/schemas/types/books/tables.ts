import type { ColumnDef } from "@tanstack/react-table"

export type AccountingBookRow = {
  id: string
  name: string
  module: string
  sub_module: string
  status: string
}

export const accountingBooksColumns: ColumnDef<AccountingBookRow>[] = [
  {
    accessorKey: "name",
    header: "Book Name",
  },
  {
    accessorKey: "module",
    header: "Module",
  },
  {
    accessorKey: "sub_module",
    header: "Sub Module",
  },
 
]
