import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Card,
  CardContent,
  Badge,
} from "@sharpnr/ui";
import { Megaphone } from "lucide-react";
import { announcements } from "./feedData";

export function AnnouncementsCarousel() {
  return (
    <section className="space-y-3">
      <header className="flex items-center gap-2">
        <Megaphone className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-base font-semibold">Announcements</h2>
      </header>

      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {announcements.map((item) => (
            <CarouselItem key={item.id} className="md:basis-1/2">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col gap-2 p-5">
                  <Badge variant="outline" className="w-fit font-normal">
                    {item.label}
                  </Badge>
                  <h3 className="text-sm font-semibold leading-snug">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
