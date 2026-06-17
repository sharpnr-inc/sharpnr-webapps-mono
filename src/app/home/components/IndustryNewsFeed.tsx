import { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  Badge,
  Separator,
  Button,
  Tabs,
  TabsList,
  TabsTrigger,
} from "@sharpnr/ui";
import {
  Newspaper,
  Clock,
  ArrowUpRight,
  ThumbsUp,
  Bookmark,
} from "lucide-react";
import { cn } from "@sharpnr/ui";
import { industryNews, newsTags } from "./feedData";

export function IndustryNewsFeed() {
  const [activeTag, setActiveTag] = useState<string>("All");
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [reacted, setReacted] = useState<Record<string, boolean>>({});

  const filtered = useMemo(
    () =>
      activeTag === "All"
        ? industryNews
        : industryNews.filter((item) => item.tag === activeTag),
    [activeTag],
  );

  const toggleSaved = (id: string) =>
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));
  const toggleReacted = (id: string) =>
    setReacted((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="space-y-4">
      <header className="flex items-center gap-2">
        <Newspaper className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-base font-semibold">Industry news</h2>
      </header>

      <Tabs value={activeTag} onValueChange={setActiveTag}>
        <TabsList variant="default" className="w-full justify-start">
          {newsTags.map((tag) => (
            <TabsTrigger key={tag} value={tag}>
              {tag}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-4">
        {filtered.map((item) => {
          const isSaved = !!saved[item.id];
          const isReacted = !!reacted[item.id];
          return (
            <Card
              key={item.id}
              className="group transition-colors hover:bg-accent/40"
            >
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {item.source}
                  </span>
                  <span>·</span>
                  <span>{item.postedAt}</span>
                  <Badge variant="secondary" className="ml-auto font-normal">
                    {item.tag}
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <h3 className="flex items-start justify-between gap-2 text-sm font-semibold leading-snug">
                    <span className="cursor-pointer">{item.title}</span>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.summary}
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{item.readMinutes} min read</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 text-xs text-muted-foreground"
                      onClick={() => toggleReacted(item.id)}
                    >
                      <ThumbsUp
                        className={cn(
                          "h-3.5 w-3.5",
                          isReacted && "fill-current",
                        )}
                      />
                      {item.helpful + (isReacted ? 1 : 0)}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 gap-1.5 text-xs text-muted-foreground"
                      onClick={() => toggleSaved(item.id)}
                    >
                      <Bookmark
                        className={cn("h-3.5 w-3.5", isSaved && "fill-current")}
                      />
                      {isSaved ? "Saved" : "Save"}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No news in this category right now.
          </p>
        )}
      </div>
    </section>
  );
}
