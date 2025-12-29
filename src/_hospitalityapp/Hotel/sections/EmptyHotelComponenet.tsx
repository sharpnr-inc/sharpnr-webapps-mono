import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ArrowUpRightIcon, Settings2Icon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";



export default function EmptyHotelPlaceHolder() {

 const navigate = useNavigate();

  const handleNavigate = () => {
    navigate({ to: "/dashboard/sharp_hospitality/org-config/hotel-settings" });
  };
  return (
    <div className="p-2">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Settings2Icon />
          </EmptyMedia>
          <EmptyTitle>NO DATA</EmptyTitle>
          <EmptyDescription>
            Please Configure the Hotel your first or click down below
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button onClick={handleNavigate}>Configure Hotel</Button>
          </div>
        </EmptyContent>
        <Button
          variant="link"
          asChild
          className="text-muted-foreground"
          size="sm"
        >
          <a href="#">
            Learn More <ArrowUpRightIcon />
          </a>
        </Button>
      </Empty>
    </div>
  );
}
