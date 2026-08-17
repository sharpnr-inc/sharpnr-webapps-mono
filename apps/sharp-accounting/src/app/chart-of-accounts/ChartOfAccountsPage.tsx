import { Fragment, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sharpnr/ui";
import { ChevronRight, MoreHorizontal, Search } from "lucide-react";
import { useLEAccountingBook } from "@/app/api/queries/books";
import { useAccountingStore } from "@/store/accounting.store";
import { formatDateTimePretty } from "@sharpnr/utils";
import { CreateAccountForm } from "@/app/shared/forms/AddAccountForm";
import { useNavigate } from "@tanstack/react-router";
import { useModal } from "@/hooks/useModal";

type Account = {
  id: string;
  account_name: string;
  code: string;
  status: string;
  last_updated: string;
};

type Group = {
  id: string;
  group_name: string;
  type: string;
  last_updated: string;
  accounts: Account[];
};

export function ChartOfAccountingPage() {
  const selectedLegalEntity = useAccountingStore((s) => s.selectedLegalEntity);

  const { data } = useLEAccountingBook(selectedLegalEntity?.id);

  const groups: Group[] = data?.data?.groups ?? [];

  const [query, setQuery] = useState("");
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const { openModal } = useModal();

  const nav = useNavigate();

  const toggleGroup = (id: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isOpen = (id: string) => openGroups[id] !== false;

  const filteredGroups = useMemo(() => {
    return groups
      .map((group) => ({
        ...group,
        accounts: group.accounts.filter((account) => {
          if (!query) return true;

          return (
            account.account_name.toLowerCase().includes(query.toLowerCase()) ||
            account.code.toLowerCase().includes(query.toLowerCase())
          );
        }),
      }))
      .filter((group) => {
        if (!query) return true;

        return (
          group.group_name.toLowerCase().includes(query.toLowerCase()) ||
          group.accounts.length > 0
        );
      });
  }, [groups, query]);

  const totalAccounts = groups.reduce(
    (acc, group) => acc + group.accounts.length,
    0,
  );

  const handleAddAccount = (groupID: string) => {
    if (!selectedLegalEntity) return;

    openModal({
      title: "Add Account",
      description: "",
      content: (
        <CreateAccountForm
          legalEntityID={selectedLegalEntity.id}
          accountingGroupID={groupID}
          accountingBookID={data?.data?.id}
        />
      ),
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Chart of Accounts</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {groups.length} Groups • {totalAccounts} Accounts
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 border rounded-md px-3 py-2 max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground" />

        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-sm"
        />
      </div>

      {/* Table */}
      <div className="border rounded-md overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_40px] border-b bg-muted px-4 py-3 text-xs font-medium uppercase text-muted-foreground">
          <div>Account / Group</div>
          <div>Type / Status</div>
          <div>Updated</div>
          <div />
        </div>

        {/* Rows */}
        {filteredGroups.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No accounts found
          </div>
        ) : (
          filteredGroups.map((group) => {
            const open = isOpen(group.id);

            return (
              <Fragment key={group.id}>
                {/* Group Row */}
                <div
                  onClick={() => toggleGroup(group.id)}
                  className="grid grid-cols-[2fr_1fr_1fr_40px] items-center border-b bg-muted/40 px-4 py-3 cursor-pointer hover:bg-muted/60"
                >
                  <div className="flex items-center gap-2">
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        open ? "rotate-90" : ""
                      }`}
                    />

                    <span className="font-medium">{group.group_name}</span>

                    <span className="text-xs text-muted-foreground">
                      ({group.accounts.length})
                    </span>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {group.type}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {formatDateTimePretty(group.last_updated)}
                  </div>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex justify-center"
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="rounded p-1 hover:bg-muted">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Group Actions</DropdownMenuLabel>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem>Edit Group</DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => handleAddAccount(group.id)}
                        >
                          Add Account
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                {/* Accounts */}
                {open &&
                  group.accounts.map((account) => (
                    <div
                      key={account.id}
                      className="grid grid-cols-[2fr_1fr_1fr_40px] items-center border-b px-4 py-3 hover:bg-muted/30"
                    >
                      <div className="flex items-center gap-3 pl-6">
                        <span>{account.account_name}</span>

                        <span className="rounded border px-2 py-0.5 text-xs text-muted-foreground">
                          {account.code}
                        </span>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {account.status}
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {formatDateTimePretty(account.last_updated)}
                      </div>

                      <div className="flex justify-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button className="rounded p-1 hover:bg-muted">
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>
                              Account Actions
                            </DropdownMenuLabel>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem>Edit Account</DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                nav({
                                  to: "/chart-of-account/$accountID/ledger",
                                  params: {
                                    accountID: account.id,
                                  },
                                });
                              }}
                            >
                              View Ledger
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
              </Fragment>
            );
          })
        )}
      </div>
    </div>
  );
}
