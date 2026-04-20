import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useUserCardStore } from "./user_card_store";
import { ChefHat, Wine, LogOut, ExternalLink, ShieldCheck } from "lucide-react";
import { config } from "@/configs/env";

export function UserCard() {
  const { isOpen, setIsOpen } = useUserCardStore();

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="rounded-full outline-none ring-offset-background transition-all focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:opacity-85 active:scale-95">
          <Avatar className="h-9 w-9 border-2 border-border shadow-sm">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="User avatar"
            />
            <AvatarFallback className="text-sm font-semibold">
              CN
            </AvatarFallback>
          </Avatar>
        </button>
      </PopoverTrigger>

      <PopoverContent
        className="w-72 p-0 shadow-xl rounded-xl border border-border/60 overflow-hidden"
        align="end"
        sideOffset={8}
      >
        {/* Header — profile section */}
        <div className="relative bg-linear-to-br from-muted/60 to-muted px-5 pt-5 pb-4">
          <div className="flex items-center gap-3.5">
            <Avatar className="h-14 w-14 border-2 border-background shadow-md ring-2 ring-primary/20">
              <AvatarImage
                src="https://github.com/shadcn.png"
                alt="User avatar"
              />
              <AvatarFallback className="text-lg font-bold">CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm text-foreground truncate">
                Cameron Newton
              </span>
              <span className="text-xs text-muted-foreground truncate">
                cameron@example.com
              </span>
              <Badge
                variant="secondary"
                className="mt-1.5 w-fit text-[10px] px-1.5 py-0 h-4 font-medium"
              >
                Admin
              </Badge>
            </div>
          </div>
        </div>

        <Separator />

        {/* Navigation items */}
        <div className="p-2">
          <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
            Quick Access
          </p>

          <button className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-accent transition-colors group">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 group-hover:bg-orange-200 dark:group-hover:bg-orange-900/40 transition-colors">
              <ChefHat className="h-3.5 w-3.5" />
            </div>
            <span className="flex-1 text-left">Kitchen</span>
            <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </button>

          <button className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-foreground hover:bg-accent transition-colors group">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-purple-100 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-900/40 transition-colors">
              <Wine className="h-3.5 w-3.5" />
            </div>
            <span className="flex-1 text-left">Bar</span>
            <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
              ⌘B
            </kbd>
          </button>
        </div>

        <Separator />

        {/* SharpIAM + Logout */}
        <div className="p-2 space-y-1">
          <Button
            onClick={() => (window.location.href = config.iamAppUrl)}
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2.5 h-9 font-medium border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/60 hover:text-primary transition-all"
          >
            <ShieldCheck className="h-4 w-4" />
            Go to SharpIAM
            <ExternalLink className="h-3 w-3 ml-auto opacity-60" />
          </Button>

          <button className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
            <LogOut className="h-4 w-4" />
            <span className="flex-1 text-left">Log out</span>
            <kbd className="hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-muted px-1.5 text-[10px] font-medium text-muted-foreground">
              ⇧⌘Q
            </kbd>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
