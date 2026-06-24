import { UsersRound, Plus } from "lucide-react";
import { Button } from "@sharpnr/ui";
import { GroupCard } from "../components/GroupCard";
import { dummyGroups } from "../data/dummyGroups";

const UserGroupIndexPage = () => {
  // TODO: replace dummy data with the real backend response.
  const groups = dummyGroups;

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6 p-6">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <UsersRound className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Groups</h1>
            <span className="text-sm text-muted-foreground">
              ({groups.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Organize people into groups and decide what each group can do.
          </p>
        </div>

        <Button className="gap-1">
          <Plus className="h-4 w-4" /> Add New Group
        </Button>
      </header>

      {/* Groups grid */}
      <div className="grid gap-3 sm:grid-cols-2">
        {groups.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
      </div>
    </div>
  );
};

export default UserGroupIndexPage;
