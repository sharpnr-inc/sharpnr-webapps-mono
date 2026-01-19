import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Building2,
  Store,
  Heart,
  Hotel,
  Wine,
  UtensilsCrossed,
  ChefHat,
  Music,
  Info,
  CheckCircle2,
} from "lucide-react";

export default function OrchestratorDomainSetup() {
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedModules, setSelectedModules] = useState([]);
  const [showConfigForm, setShowConfigForm] = useState(false);
  const [sharedKitchen, setSharedKitchen] = useState("");
  const [sameLegalEntity, setSameLegalEntity] = useState("");

  const properties = [
  {
    id: 'prop-1',
    name: 'Sharpnr Central Hospitality',
    address: 'Indiranagar, Bangalore',
  },
  {
    id: 'prop-2',
    name: 'Sharpnr Airport Suites',
    address: 'Devanahalli, Bangalore',
  },
  {
    id: 'prop-3',
    name: 'Sharpnr Downtown Residency',
    address: 'MG Road, Bangalore',
  },
];

const [selectedPropertyId, setSelectedPropertyId] = useState(properties[0].id);

const selectedProperty = properties.find(
  (p) => p.id === selectedPropertyId
);


  const hospitalityModules = [
    {
      id: "hotel",
      title: "Hotel",
      description:
        "Complete hotel management with room booking, housekeeping, and guest services",
      icon: Hotel,
      available: true,
    },
    {
      id: "bar",
      title: "Bar",
      description:
        "Bar operations with inventory management, billing, and mixology features",
      icon: Wine,
      available: true,
    },
    {
      id: "restaurant",
      title: "Restaurant",
      description:
        "Full-service restaurant management with table ordering, kitchen display, and POS",
      icon: UtensilsCrossed,
      available: true,
    },
    {
      id: "cloud-kitchen",
      title: "Cloud Kitchen / Takeaways",
      description:
        "Delivery-focused operations with online ordering and kitchen management",
      icon: ChefHat,
      available: true,
    },
    {
      id: "pubs-lounges",
      title: "Pubs and Lounges",
      description:
        "Nightlife venue management with entertainment, reservations, and beverage control",
      icon: Music,
      available: true,
    },
  ];

  const handleDomainChange = (value: React.SetStateAction<string>) => {
    setSelectedDomain(value);
    setSelectedModules([]);
    setShowConfigForm(false);
  };

  const handleModuleToggle = (moduleId: string) => {
    setSelectedModules((prev) => {
      if (prev.includes(moduleId)) {
        return prev.filter((id) => id !== moduleId);
      } else {
        return [...prev, moduleId];
      }
    });
    setShowConfigForm(false);
  };

  const handleDone = () => {
    if (selectedModules.length > 0) {
      setShowConfigForm(true);
    }
  };

  const handleContinue = () => {
    console.log("Configuration:", {
      domain: selectedDomain,
      modules: selectedModules,
      sharedKitchen,
      sameLegalEntity,
    });
    alert("Configuration saved! Proceeding to next step...");
  };

  const getSelectedModuleNames = () => {
    return selectedModules
      .map((id) => hospitalityModules.find((m) => m.id === id)?.title)
      .join(", ");
  };

  return (
    <div className=" mx-auto p-2 space-y-6">
      <div className="space-y-2">
        <h1 className="text-xl font-bold">Domain Setup</h1>
        <p className="text-muted-foreground">
          Select your business domain and specific modules to get started with
          the configuration
        </p>
      </div>

  <Card>
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Building2 className="h-5 w-5" />
      Select Property
    </CardTitle>
    <CardDescription>
      Choose which property you want to configure
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-4">
    <div className="space-y-2">
      <Label>Property</Label>
      <Select
        value={selectedPropertyId}
        onValueChange={setSelectedPropertyId}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a property" />
        </SelectTrigger>
        <SelectContent>
          {properties.map((property) => (
            <SelectItem key={property.id} value={property.id}>
              <div className="flex flex-col">
                <span className="font-medium">{property.name}</span>
                <span className="text-xs text-muted-foreground">
                  {property.address}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <Badge variant="secondary">Draft</Badge>
  </CardContent>
</Card>


      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Select Your Business Domain
          </CardTitle>
          <CardDescription>
            Choose the industry domain that best matches your business
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="domain">
              Business Domain <span className="text-destructive">*</span>
            </Label>
            <Select value={selectedDomain} onValueChange={handleDomainChange}>
              <SelectTrigger id="domain" className="w-full">
                <SelectValue placeholder="Select your business domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hospitality">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4" />
                    <span>Hospitality</span>
                  </div>
                </SelectItem>
                <SelectItem value="retail">
                  <div className="flex items-center gap-2">
                    <Store className="h-4 w-4" />
                    <span>Retail</span>
                  </div>
                </SelectItem>
                <SelectItem value="medical">
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
                    <span>Medical</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedDomain === "hospitality" && (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">
                  Select Your Modules
                </h2>
                <p className="text-muted-foreground">
                  Choose one or more hospitality modules that match your
                  business operations
                </p>
              </div>
              {selectedModules.length > 0 && (
                <Badge variant="secondary" className="text-base px-4 py-2">
                  {selectedModules.length} Selected
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hospitalityModules.map((module) => {
                const Icon = module.icon;
                const isSelected = selectedModules.includes(module.id);

                return (
                  <Card
                    key={module.id}
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      isSelected ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleModuleToggle(module.id)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="h-6 w-6" />
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {module.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {selectedModules.length > 0 && (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Modules Selected</AlertTitle>
                <AlertDescription>
                  You have selected {selectedModules.length} module
                  {selectedModules.length > 1 ? "s" : ""}:{" "}
                  {getSelectedModuleNames()}
                </AlertDescription>
              </Alert>
            )}
          </div>

          {selectedModules.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Module Configuration</CardTitle>
                <CardDescription>
                  Please answer the following questions about your{" "}
                  {selectedModules.length} selected module
                  {selectedModules.length > 1 ? "s" : ""}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-3 p-4 rounded-lg border">
                    <Label className="text-base font-medium">
                      Do all these {selectedModules.length} module
                      {selectedModules.length > 1 ? "s" : ""} share the same
                      kitchen?
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select if your selected modules operate from a common
                      kitchen facility
                    </p>
                    <RadioGroup
                      value={sharedKitchen}
                      onValueChange={setSharedKitchen}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="kitchen-yes" />
                        <Label
                          htmlFor="kitchen-yes"
                          className="font-normal cursor-pointer"
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="kitchen-no" />
                        <Label
                          htmlFor="kitchen-no"
                          className="font-normal cursor-pointer"
                        >
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3 p-4 rounded-lg border">
                    <Label className="text-base font-medium">
                      Do all these module{selectedModules.length > 1 ? "s" : ""}{" "}
                      come under the same legal entity?
                    </Label>
                    <p className="text-sm text-muted-foreground mb-3">
                      Select if all selected modules are registered under one
                      business entity
                    </p>
                    <RadioGroup
                      value={sameLegalEntity}
                      onValueChange={setSameLegalEntity}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="entity-yes" />
                        <Label
                          htmlFor="entity-yes"
                          className="font-normal cursor-pointer"
                        >
                          Yes
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="entity-no" />
                        <Label
                          htmlFor="entity-no"
                          className="font-normal cursor-pointer"
                        >
                          No
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {(selectedDomain === "retail" || selectedDomain === "medical") && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="flex items-center gap-2">
            Coming Soon
            <Badge variant="secondary">In Development</Badge>
          </AlertTitle>
          <AlertDescription>
            {selectedDomain === "retail"
              ? "Retail modules are currently under development and will be available soon. Stay tuned for updates!"
              : "Medical modules are currently under development and will be available soon. Stay tuned for updates!"}
          </AlertDescription>
        </Alert>
      )}

      {selectedDomain && selectedDomain !== "hospitality" && (
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline">
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
