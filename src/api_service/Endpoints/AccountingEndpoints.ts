/**
 * API endpoint paths for all Accounting-related operations.
 *
 * The `Accounting` object organizes routes into logical subgroups:
 * - `Transactions` → handles all transaction-related operations.
 * - `Sales` → deals with sales data, invoices, and sales reports.
 * - `Purchase` → manages purchase bills and supplier-related entries.
 * - `Ledger` → provides access to ledger data and summaries.
 * - `Reports` → generates various accounting reports and analytics.
 *
 * This modular structure improves readability, scalability, and 
 * reduces duplication when expanding your accounting APIs.
 *
 * @constant {Object} Accounting
 * @property {Object} Transactions - Endpoints related to accounting transactions.
 * @property {string} Transactions.GetAll - Fetch all transactions.
 * @property {(id: string) => string} Transactions.GetById - Fetch details for a specific transaction.
 *
 * @property {Object} Sales - Endpoints related to sales and invoices.
 * @property {string} Sales.GetAll - Fetch all sales entries.
 * @property {string} Sales.GetReports - Fetch detailed sales reports.
 *
 * @property {Object} Purchase - Endpoints related to purchase management.
 * @property {string} Purchase.GetAllBills - Fetch all purchase bills.
 * @property {(billId: string) => string} Purchase.GetBillById - Fetch specific purchase bill details.
 *
 * @property {Object} Ledger - Endpoints related to general ledger operations.
 * @property {string} Ledger.GetAll - Fetch ledger summaries.
 * @property {(accountId: string) => string} Ledger.GetAccountLedger - Fetch ledger details for a specific account.
 *
 * @property {Object} Reports - Endpoints related to financial reporting.
 * @property {string} Reports.GetProfitLoss - Fetch profit and loss reports.
 * @property {string} Reports.GetBalanceSheet - Fetch balance sheet data.
 * @property {string} Reports.GetCashFlow - Fetch cash flow reports.
 *
 * @example
 * import { Accounting } from "@/api/routes";
 *
 * // Example: Fetch all transactions
 * fetch(Accounting.Transactions.GetAll)
 *   .then(res => res.json())
 *   .then(console.log);
 *
 * // Example: Get a specific transaction
 * fetch(Accounting.Transactions.GetById("txn_123"));
 *
 * @exports
 */
export const Accounting = {
  Transactions: {
    GetAll: "/accounting/transactions",
    GetById: (id: string) => `/accounting/transactions/${id}`,
  },

  Sales: {
    GetAll: "/accounting/sales",
    GetReports: "/accounting/sales/reports",
  },

  Purchase: {
    GetAllBills: "/accounting/purchase/bills",
    GetBillById: (billId: string) => `/accounting/purchase/bills/${billId}`,
  },

  Ledger: {
    GetAll: "/accounting/ledger",
    GetAccountLedger: (accountId: string) => `/accounting/ledger/${accountId}`,
  },

  Reports: {
    GetProfitLoss: "/accounting/reports/profit-loss",
    GetBalanceSheet: "/accounting/reports/balance-sheet",
    GetCashFlow: "/accounting/reports/cash-flow",
  },
};
