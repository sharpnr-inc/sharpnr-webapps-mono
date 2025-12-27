export type TransactionItem = {
  id: string;
  entry_date: string;
  reference: string;
  narration: string;
  total_debit: number;
  total_credit: number;
  created_at: string;
};

export type TransactionsResponse = {
  statusCode: number;
  message: string;
  data: {
    items: TransactionItem[];
    total: number;
  };
};
