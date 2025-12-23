import AddItemInMenuForm from "../forms/AddItemInMenuForm";
// import { barMenu } from "@/dummy_data/menu_data"; // ✅ make sure your dummy data is exported from this path
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMenuGroupDetails } from "@/_hospitalityapp/shared/Menu/apis/Menu";

export default function MenuBarMenuSection({ group }: { group: any }) {

  const { data, isLoading, error } = useMenuGroupDetails(group.Id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu details</div>;

  console.log("Categories:", data.data);
   const categories = data?.data ?? []; // your API returns { data: [...] }
  
  console.log(group);
  return (
    <div className="p-4 border rounded-2xl shadow-sm">
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-3"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Add Item</AccordionTrigger>
          <AccordionContent className="place-items-center">
             <AddItemInMenuForm group={group} categories={categories} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
