import { useMenuGroupDetails } from "@/api_service/queries/HospitalityQueries/Menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddItemInMenuForm from "../forms/AddItemInMenuForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function MenuSectionDetails({ group }: { group: any }) {
  const { data, isLoading, error } = useMenuGroupDetails(group.Id);
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
                            <Card>
                              <CardHeader>
                                <CardTitle>{item.name}</CardTitle>
                                <CardDescription>
                                  {item.description}
                                </CardDescription>
                                <CardContent className="">
                                  <div>
                                    {item.variant_groups?.map((vgs: any) => (
                                      <div>
                                        {vgs.name}
                                        <div>
                                          {vgs.variants?.map((vg: any) => (
                                            <div>
                                              {vg.name}
                                              <span>{vg.price}</span>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                                <CardFooter className="flex flex-col">
                                  <div>Addons</div>
                                  <div>
                                    {item.add_ons?.map((ads: any) => (
                                      <Badge>
                                        {ads.Name}
                                        <span>{ads.Price}</span>
                                      </Badge>
                                    ))}
                                  </div>
                                </CardFooter>
                              </CardHeader>
                            </Card>
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
