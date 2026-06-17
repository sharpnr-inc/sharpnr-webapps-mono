import { useState } from "react";
import { Card, CardContent, Badge, Button } from "@sharpnr/ui";
import { Tag, ChevronRight, Bookmark } from "lucide-react";
import { cn } from "@sharpnr/ui";
import { offers } from "./feedData";

export function OffersPanel() {
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  const toggleSaved = (id: string) =>
    setSaved((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section className="space-y-4">
      <header className="flex items-center gap-2">
        <Tag className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-base font-semibold">Offers for you</h2>
      </header>

      <div className="space-y-3">
        {offers.map((offer) => {
          const isSaved = !!saved[offer.id];
          return (
            <Card key={offer.id} className="transition-colors hover:bg-accent/40">
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-normal">
                    {offer.badge}
                  </Badge>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {offer.expiresAt}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground"
                    onClick={() => toggleSaved(offer.id)}
                    aria-label={isSaved ? "Remove from saved" : "Save offer"}
                  >
                    <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
                  </Button>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-semibold leading-snug">{offer.title}</p>
                  <p className="text-xs text-muted-foreground">via {offer.partner}</p>
                </div>

                <p className="text-sm text-muted-foreground">{offer.description}</p>

                <Button variant="outline" size="sm" className="w-full justify-between">
                  View offer
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
