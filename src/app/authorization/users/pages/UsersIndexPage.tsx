import { useMemo, useState } from "react";
import { Users, Plus, Search, Info } from "lucide-react";
import { Button, Input } from "@sharpnr/ui";
import { UserCard } from "../components/UserCard";
import { MOCK_USERS } from "../data/users.mock";

const UsersIndexPage = () => {
  const [query, setQuery] = useState("");

  const users = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_USERS;
    return MOCK_USERS.filter((u) =>
      [u.name, u.email, u.title, u.department, u.role].some((field) =>
        field.toLowerCase().includes(q),
      ),
    );
  }, [query]);

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-6">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Users</h1>
            <span className="text-sm text-muted-foreground">
              ({MOCK_USERS.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Everyone with access to your organization, and the role each person
            holds.
          </p>
        </div>

        <Button className="gap-1">
          <Plus className="h-4 w-4" /> Invite User
        </Button>
      </header>

      {/* Explainer */}
      <div className="flex items-start gap-3 rounded-xl border bg-muted/30 p-4">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
        <p className="text-sm text-muted-foreground">
          A <span className="font-medium text-foreground">user</span> is one
          person in your organization. Their{" "}
          <span className="font-medium text-foreground">role</span> decides what
          they can see and do. Click a card to manage that person's access.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email or department..."
          className="pl-9"
        />
      </div>

      {/* Grid of ID cards */}
      {users.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-12 text-center">
          <Users className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No users match your search.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default UsersIndexPage;
