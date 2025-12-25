// types/accounting.ts
export type AccountingGroup = {
  id: string
  name: string
  accounting_book_id: string
  type: "ASSET" | "LIABILITY" | "EQUITY" | "INCOME" | "EXPENSE"
  created_at: string
  updated_at: string
}
