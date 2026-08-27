import { UsersRound, Plus, AlertTriangle } from "lucide-react";
import { Button, Skeleton, useModal } from "@sharpnr/ui";
import { GroupCard } from "../components/GroupCard";
import { useNavigate } from "@tanstack/react-router";
import CreateUserGroupForm from "../components/CreateUserGroupForm";
import { useUserGroups } from "../api/queries";

// Cycled across the grid so each group gets a distinct pixel-shimmer color.
const PIXEL_VARIANTS = ["blue", "pink", "yellow", "default"] as const;

const UserGroupIndexPage = () => {
  const { openModal, closeModal } = useModal();
  const { data, isLoading, isError } = useUserGroups();
  const groups = data?.data ?? [];

  const handleCreateUserGroup = () => {
    openModal({
      content: <CreateUserGroupForm closeModal={closeModal} />,
      title: "New User Group",
      description: "Add new user group",
      size: "lg",
    });
  };

  const nav = useNavigate();

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 p-6">
      {/* Header */}
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <UsersRound className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">Groups</h1>
            {!isLoading && !isError && (
              <span className="text-sm text-muted-foreground">
                ({groups.length})
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Organize people into groups and decide what each group can do.
          </p>
        </div>

        <Button className="gap-1" onClick={() => handleCreateUserGroup()}>
          <Plus className="h-4 w-4" /> Add New Group
        </Button>
      </header>

      {/* Groups grid */}
      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-57.5 w-full rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-12 text-center">
          <AlertTriangle className="h-6 w-6 text-destructive" />
          <p className="text-sm text-muted-foreground">
            Couldn't load groups. Please try again.
          </p>
        </div>
      ) : groups.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed py-12 text-center">
          <UsersRound className="h-6 w-6 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No groups yet. Create one to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group, i) => (
            <GroupCard
              key={group.id}
              group={group}
              onClick={() =>
                nav({
                  to: "/authorization/user_groups/$groupID",
                  params: {
                    groupID: group.id,
                  },
                })
              }
              variant={PIXEL_VARIANTS[i % PIXEL_VARIANTS.length]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserGroupIndexPage;
