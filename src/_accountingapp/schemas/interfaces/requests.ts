export interface CreateAccountRequest {
  accounting_book_id: string; // UUID
  account_group_id: string;   // UUID

  name: string;
  code: string;

  opening_balance?: number;
  is_debit: boolean; // true = Dr, false = Cr

  is_default: boolean;
}
