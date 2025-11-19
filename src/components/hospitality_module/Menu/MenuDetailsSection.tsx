import { useMenuGroupDetails } from "@/api_service/queries/HospitalityQueries/Menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddItemInMenuForm from "../forms/AddItemInMenuForm";

export default function MenuSectionDetails({ group }: { group: any }) {
  const { data, isLoading, error } = useMenuGroupDetails(group.Id);
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Menu for: {group.Name}</h2>
      <AddItemInMenuForm group={group} categories={data?.data} />
      {/* Root Accordion */}
      <Accordion type="multiple" className="w-full">
        {data?.data.map((cat: any) => (
          <AccordionItem key={cat.id} value={cat.id}>
            <AccordionTrigger className="text-base font-medium">
              {cat.name}
            </AccordionTrigger>

            <AccordionContent>
              {/* Sub Categories Accordion */}
              <Accordion type="multiple" className="ml-4 border-l pl-4">
                {cat.sub_categories?.map((sub: any) => (
                  <AccordionItem key={sub.id} value={sub.id}>
                    <AccordionTrigger className="text-sm">
                      {sub.name}
                    </AccordionTrigger>

                    <AccordionContent>
                      {/* Menu Items */}
                      {sub.menu_items?.length ? (
                        <Accordion
                          type="multiple"
                          className="ml-4 border-l pl-4"
                        >
                          {sub.menu_items.map((item: any) => (
                            <AccordionItem key={item.id} value={item.id}>
                              <AccordionTrigger className="text-sm">
                                {item.name} — ₹{item.price}
                              </AccordionTrigger>

                              <AccordionContent>
                                {/* Variant Groups */}
                                {item.variant_groups?.length ? (
                                  <Accordion
                                    type="multiple"
                                    className="ml-4 border-l pl-4"
                                  >
                                    {item.variant_groups.map((vg: any) => (
                                      <AccordionItem key={vg.id} value={vg.id}>
                                        <AccordionTrigger className="text-sm">
                                          {vg.name}
                                        </AccordionTrigger>

                                        <AccordionContent>
                                          {/* Variants */}
                                          <ul className="ml-4 list-disc text-sm">
                                            {vg.variants.map((v: any) => (
                                              <li key={v.id}>
                                                {v.name} — ₹{v.price}
                                              </li>
                                            ))}
                                          </ul>
                                        </AccordionContent>
                                      </AccordionItem>
                                    ))}
                                  </Accordion>
                                ) : (
                                  <div className="ml-4 text-sm text-muted-foreground">
                                    No variant groups
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : (
                        <div className="ml-4 text-sm text-muted-foreground">
                          No menu items
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
