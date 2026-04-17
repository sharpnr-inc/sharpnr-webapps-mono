import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/_layout/")({
  component: SonnerDemo,
});

function SonnerDemo() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast.info("Event has been created", {
          position: "bottom-center", // top-left | top-center | top-right | bottom-left | bottom-center | bottom-right

          description: "Sunday, December 03, 2023 at 9:00 AM",

          duration: 4000, // milliseconds (default 4000)
          id: "event-created-toast", // prevents duplicates / allows updates
          richColors: true, // enable colored variant styling
          closeButton: true, // show close icon

          icon: "📅", // emoji OR React icon component

          action: {
            label: "Undo",
            onClick: () => console.log("Undo clicked"),
            actionButtonStyle: {
              backgroundColor: "black",
              color: "white",
            },
          },

          cancel: {
            label: "Cancel",
            onClick: () => console.log("Cancel clicked"),
          },

          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid #333",
          },

          className: "my-custom-toast", // optional Tailwind/custom CSS class
        })
      }
    >
      Show Toast
    </Button>
  );
}
