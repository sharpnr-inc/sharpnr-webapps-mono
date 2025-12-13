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
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function MenuSectionDetails({ group }: { group: any }) {
  const { data, isLoading, error } = useMenuGroupDetails(group.Id);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Menu for: {group.Name}</h2>

      <AddItemInMenuForm group={group} categories={data?.data} />

      {/* MAIN ACCORDION */}
      <Accordion type="multiple" className="w-full space-y-2">
        {data?.data.map((cat: any) => (
          <AccordionItem
            key={cat.id}
            value={cat.id}
            className="border rounded-lg"
          >
            <AccordionTrigger className="px-4 py-3 text-lg font-medium">
              {cat.name}
            </AccordionTrigger>

            <AccordionContent className="bg-muted/30 p-4 rounded-b-lg space-y-4">
              {/* SUB CATEGORY ACCORDION */}
              <Accordion type="multiple" className="space-y-2">
                {cat.sub_categories?.map((sub: any) => (
                  <AccordionItem
                    key={sub.id}
                    value={sub.id}
                    className="border rounded-lg"
                  >
                    <AccordionTrigger className="px-4 py-2 text-base">
                      {sub.name}
                    </AccordionTrigger>

                    <AccordionContent className="bg-muted/20 p-4 space-y-4 rounded-b-lg">
                      {/* MENU ITEMS */}
                      {sub.menu_items?.length ? (
                        <div className="space-y-4">
                          {sub.menu_items.map((item: any) => (
                            <Card
                              key={item.id}
                              className="bg-[#111] border border-[#222] rounded-xl p-4 w-full shadow-md"
                            >
                              <div className="flex items-start gap-4">
                                {/* Image */}
                                <img
                                  src="https://placehold.co/120x120"
                                  className="w-24 h-24 rounded-lg object-cover border border-neutral-700"
                                />

                                {/* Title + Desc */}
                                <div className="flex-1 space-y-1">
                                  <CardTitle className="text-lg text-white">
                                    {item.name}
                                  </CardTitle>

                                  <CardDescription className="text-neutral-400">
                                    {item.description}
                                  </CardDescription>

                                  {/* Category + Veg Badge */}
                                  <div className="flex items-center gap-2 text-sm mt-1">
                                    <span className="text-neutral-400">
                                      🍽 {cat.name}
                                    </span>

                                    <Badge className="bg-green-600/20 text-green-400">
                                      {item.is_veg ? "Veg" : "Non-Veg"}
                                    </Badge>
                                  </div>
                                </div>

                                {/* Price */}
                                <Badge className="text-base px-3 py-1 bg-neutral-800 text-white">
                                  ₹
                                  {item.default_price ||
                                    item.variant_groups?.[0]?.variants?.[0]
                                      ?.price}
                                </Badge>
                              </div>

                              <Separator className="my-4 bg-neutral-700" />

                              {/* VARIANTS */}
                              <div className="space-y-3">
                                {item.variant_groups?.map((vg: any) => (
                                  <div key={vg.id} className="space-y-1">
                                    <div className="text-neutral-200 font-medium">
                                      {vg.name}
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                      {vg.variants?.map((v: any) => (
                                        <Badge
                                          key={v.id}
                                          className="bg-neutral-800 text-neutral-200 px-3 py-1"
                                        >
                                          {v.name} — ₹{v.price}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <Separator className="my-4 bg-neutral-700" />

                              {/* ADDONS */}
                              <div className="space-y-2">
                                <div className="font-medium text-neutral-300">
                                  Add-ons
                                </div>

                                <div className="flex flex-wrap gap-2">
                                  {item.add_ons?.map((ad: any) => (
                                    <Badge
                                      key={ad.id}
                                      className="bg-neutral-800 text-neutral-200 px-3 py-1"
                                    >
                                      {ad.Name} +₹{ad.Price}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">
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
