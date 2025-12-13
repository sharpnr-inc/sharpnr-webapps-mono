import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/ui/accordion";
// import { ui_render, type UIRendererTree } from "@/dummy_data/ui_render_tree";
import {
  employee_policy,
  type EmployeePolicy,
} from "@/dummy_data/employee_policy";
import { useState } from "react";
import { Label } from "../../../components/ui/label";
import { Separator } from "../../../components/ui/separator";

export default function EmployeePrivilegeManager() {
  const [policy, setPolicy] = useState<EmployeePolicy>(employee_policy);
  console.log(setPolicy);
  const handleCheckboxChange = (
    moduleKey: string,
    sectionKey: string,
    itemKey: string
  ) => {
    // You can implement toggling logic here later (setPolicy)
    console.log(`Toggled: ${moduleKey} → ${sectionKey} → ${itemKey}`);
  };
  return (
    <div className="space-y-6">
      <Card className="shadow-md border border-muted rounded-xl">
        <CardHeader>
          <CardTitle>Kashif's Privileges Policy</CardTitle>
          <CardDescription>Edit and Grant Privileges</CardDescription>
        </CardHeader>

        <CardContent>
          <Accordion type="multiple" className="w-full">
            {Object.entries(policy.Privilages).map(
              ([moduleKey, moduleValue]) => (
                <AccordionItem key={moduleKey} value={moduleKey}>
                  <AccordionTrigger className="text-lg font-medium capitalize">
                    {moduleKey.replace(/_/g, " ")}
                  </AccordionTrigger>

                  <AccordionContent>
                    {moduleValue.sections ? (
                      Object.entries(moduleValue.sections).map(
                        ([sectionKey, sectionValue]) => (
                          <div key={sectionKey} className="mb-4">
                            <h4 className="font-semibold capitalize mb-2">
                              {sectionKey.replace(/_/g, " ")}
                            </h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                              {Object.entries(sectionValue).map(([itemKey]) => (
                                <div
                                  key={itemKey}
                                  className="flex items-center space-x-2"
                                >
                                  <Checkbox
                                    id={`${moduleKey}-${sectionKey}-${itemKey}`}
                                    onCheckedChange={() =>
                                      handleCheckboxChange(
                                        moduleKey,
                                        sectionKey,
                                        itemKey
                                      )
                                    }
                                  />
                                  <Label
                                    htmlFor={`${moduleKey}-${sectionKey}-${itemKey}`}
                                    className="capitalize"
                                  >
                                    {itemKey.replace(/_/g, " ")}
                                  </Label>
                                </div>
                              ))}
                            </div>
                            <Separator className="my-3" />
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-muted-foreground italic">
                        No detailed sections available.
                      </p>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )
            )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
