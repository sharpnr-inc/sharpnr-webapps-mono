//this page shows the details of property
// this component is domain agnostic
// TODO we need a body witch will be domain agnostic
// FIXME Here the there is an mistake with response body
// FIXME  We need Property modules and infra section because the Kitchen is an infra
// *Kitchen is an infra of the property where order is processed

// TODO remove the API integration and then Create and Domain agnostic schema
// We will also gonna need the flags in modules that if the property's modules are configure or Not

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { usePropertyDetails } from "../api/queries/general";
import {
  WrenchIcon,
  AlertCircle,
  ArrowLeft,
  MapPin,
  AlertCircleIcon,
  ArrowRight,
  PlusCircleIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "@tanstack/react-router";
import { createId } from "@/utilities/id";
import { Badge as SB } from "@/components/ui/badge";

/*
this component takes the propertyID as prop from the tanstack router
NOTE make sure we use the useParams from the tanstack router
*/

interface PropertyDetailsPageProps {
  propertyId: string;
}

// STUB this is the schema that we want
interface PropertyModules {
  id: string;
  name: string;
  moduleType: string;
  status: boolean;
  isSetup_complete: boolean;
}

interface PropertyInfra {
  id: string;
  name: string;
  isSetup_complete?: boolean;
}

interface PropertyDetailsData {
  propertyID: string;
  domain: string;
  modules: PropertyModules[];
  property_infra: PropertyInfra[];
}

const propertyDetails: PropertyDetailsData = {
  propertyID: createId(),
  domain: "hospitality",
  modules: [
    {
      id: createId(),
      name: "Hotel",
      isSetup_complete: true,
      status: false,
      moduleType: "HOTEL",
    },
    {
      id: createId(),
      name: "Bar",
      isSetup_complete: true,
      status: false,
      moduleType: "BAR",
    },
    {
      id: createId(),
      name: "Restaurant",
      isSetup_complete: true,
      status: false,
      moduleType: "RESTAURANT",
    },
    {
      id: createId(),
      name: "Night Club",
      isSetup_complete: false,
      status: true,
      moduleType: "NIGHT_CLUB",
    },
  ],
  property_infra: [
    {
      id: createId(),
      name: "Reception",
      isSetup_complete: true,
    },
    {
      id: createId(),
      name: "Kitchen",
      // intentionally undefined → Not Configured
    },
    {
      id: createId(),
      name: "Power Backup",
      isSetup_complete: false,
    },
  ],
};
export function PropertyDetailsPage({ propertyId }: PropertyDetailsPageProps) {
  // *this query hook takes the PropertyID to fetch the data
  // *In this section we need the domain agnostic data
  // const { data, isLoading } = usePropertyDetails(propertyId);
  // const property = data?.data;
  // const isModuleConfigured = property?.modules;
  // const isDomain = property?.domain;
  const nav = useNavigate();
  const handleModuleConfigure = (module: PropertyModules) => {
    if (module.moduleType == "HOTEL") {
      nav({
        to: "/orchestrator/property/$propertyId/domain_hospitality/hotel_config/$hotelId/configuration",
        params: {
          hotelId: module.id,
          propertyId: propertyId,
        },
      });
    } else if (module.moduleType == "RESTAURANT") {
      nav({
        to: "/orchestrator/property/$propertyId/domain_hospitality/restaurant_config/$restaurantId/configuration",
        params: {
         restaurantId:module.id,
          propertyId: propertyId,
        },
      });
    } else if (module.moduleType == "BAR") {
      nav({
        to: "/orchestrator/property/$propertyId/domain_hospitality/bar_config/$barId/configuration",
        params: {
          barId: module.id,
          propertyId: propertyId,
        },
      });
    } else if (module.moduleType == "NIGHT_CLUB") {
      nav({
        to: "/orchestrator/property/$propertyId/domain_hospitality/hotel_config/$hotelId/configuration",
        params: {
          hotelId: module.id,
          propertyId: propertyId,
        },
      });
    }
  };

  const handlePropertySettingPage=()=>{
    nav({
      to:"/orchestrator/property/$propertyId/property_settings",
      params:{
        propertyId:propertyId
      }
    })
  }

  return (
    <div className="space-y-2">
      <div>
        <Button
          variant={"link"}
          onClick={() =>
            nav({
              to: "/orchestrator/property",
            })
          }
        >
          <ArrowLeft />
          Property page
        </Button>
      </div>
      <Card className="relative">
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle className="text-lg">Property Name</CardTitle>

            <CardDescription className="space-y-3">
              {/* Address */}
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>Joshi Marg, Jhotwara, Jaipur, Rajasthan 302012</span>
              </div>

              {/* Domain */}
              <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">Domain</p>
                <SB variant="secondary">Hospitality</SB>
              </div>
            </CardDescription>
          </div>

          {/* Settings Button */}
          <Button onClick={()=>handlePropertySettingPage()} size="default" variant="default" className="shrink-0">
            <WrenchIcon className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </CardHeader>

        {/* Footer */}
        <CardFooter className="pt-0">
          <Button variant="link" className="px-0">
            <AlertCircleIcon />
            Learn more about the property’s domain
          </Button>
        </CardFooter>
      </Card>

      {/* Modules */}
      <Card>
        <CardHeader>
          <CardTitle>Modules</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3.5 sm:grid-cols-3">
          {propertyDetails.modules.map((module) => (
            <Card
              key={module.id}
              className="h-fit hover:border-2 hover:border-accent-foreground transform transition-transform duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.3 hover:shadow-xl"
            >
              <CardHeader>
                <CardTitle>{module.name}</CardTitle>
                <CardDescription>
                  {module.status ? (
                    <SB variant={"secondary"}>Active</SB>
                  ) : (
                    <SB variant={"destructive"}>Not Active</SB>
                  )}
                </CardDescription>
              </CardHeader>

              {module.isSetup_complete && (
                <CardContent>
                  {
                    <Alert variant={"warning"}>
                      <AlertTitle className="flex items-center gap-2">
                        <AlertCircleIcon className="h-4 w-4" />
                        Module Not Configured
                      </AlertTitle>

                      <AlertDescription>
                        Click the modules below to configure this module.
                      </AlertDescription>
                    </Alert>
                  }
                </CardContent>
              )}

              <CardFooter>
                {module.isSetup_complete ? (
                  <Button onClick={()=>handleModuleConfigure(module)} className="w-full" variant={"outline"}>
                    Configure
                  </Button>
                ) : (
                  <Button className="w-full">
                    Go to Module <ArrowRight />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
          {/* */}
        </CardContent>
      </Card>

      {/* Infrastructure */}
      <Card className="relative">
        <CardHeader className="space-y-2">
          <CardTitle>Infrastructure</CardTitle>

          <CardDescription className="space-y-2">
            <p>
              Property infrastructure defines how modules are ordered and how
              operations are processed within the property.
            </p>

            <Button variant="link" className="h-auto p-0">
              <AlertCircle />
              Learn more about property infrastructure
            </Button>
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-5 sm:grid-cols-2">
          {propertyDetails.property_infra.map((infra) => (
            <Card key={infra.id}>
              <CardHeader>
                {infra.name}
                <CardDescription>
                  {"This is the default Description of the Property infra"}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button>
                  View Details
                  <ArrowRight />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
        {/* this button open modal to add the infra for the property */}
        <Button className="absolute top-5 right-5">
          <PlusCircleIcon /> Add Infra
        </Button>
      </Card>
    </div>
  );
}

/* ----------------------------- */
/* Skeleton                      */
/* ----------------------------- */
function PropertyDetailsSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 1 }).map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-4 w-1/3" />
          </CardHeader>
          <CardContent className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
