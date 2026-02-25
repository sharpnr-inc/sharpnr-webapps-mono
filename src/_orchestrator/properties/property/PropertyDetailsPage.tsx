import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePropertyDetails } from "@/_orchestrator/OrchestDashboard/api/queries/general";
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
import { Badge as SB } from "@/components/ui/badge";
import { useFormsModal } from "@/context/FormModalContext";
import AddModulesInProperty from "./forms/AddModulesInProperty";

/*
this component takes the propertyID as prop from the tanstack router
NOTE make sure we use the useParams from the tanstack router
*/

interface PropertyDetailsPageProps {
  propertyId: string;
}

// If you use UUIDs as strings on the frontend
type UUID = string;

/**
 * Matches: ModulesDetails_dto
 */
export interface ModulesDetailsDto {
  id: UUID;
  name: string;
  status: boolean;
  module_type: string;
  is_configured: boolean;
}

/**
 * Matches: PropertyInfra_res_dto
 */
export interface PropertyInfraResDto {
  id: UUID;
  name: string;
  status: boolean;
  infra_type: string;
}

/**
 * Matches: PropertyDetails_res_dto
 */
export interface PropertyDetailsResDto {
  name: string;
  code: string;
  city: string;
  address_line: string;
  state: string;
  country: string;

  // pointer + omitempty → optional
  domain?: "";

  __modules__data__?: ModulesDetailsDto[];

  infra?: PropertyInfraResDto[];
}

export function PropertyDetailsPage({ propertyId }: PropertyDetailsPageProps) {
  const { data } = usePropertyDetails(propertyId);
  const property = data?.data;

  const nav = useNavigate();

  const handleModuleConfigure = (module: ModulesDetailsDto) => {
    if (module.module_type == "HOTEL") {
      nav({
        to: "/orchestrator/property/$propertyId/domain_hospitality/hotel_config/$hotelId/configuration",
        params: {
          hotelId: module.id,
          propertyId: propertyId,
        },
      });
    } else if (module.module_type == "RESTAURANT") {
      nav({
        to: "/orchestrator/property/$propertyId/domain_hospitality/restaurant_config/$restaurantId/configuration",
        params: {
          restaurantId: module.id,
          propertyId: propertyId,
        },
      });
    } else if (module.module_type == "BAR") {
      nav({
        to: "/orchestrator/property/$propertyId/domain_hospitality/bar_config/$barId/configuration",
        params: {
          barId: module.id,
          propertyId: propertyId,
        },
      });
    } else if (module.module_type == "NIGHT_CLUB") {
      nav({
        to: "/orchestrator/property/$propertyId/domain_hospitality/hotel_config/$hotelId/configuration",
        params: {
          hotelId: module.id,
          propertyId: propertyId,
        },
      });
    }
  };

  const handleModuleNav = (module: ModulesDetailsDto) => {
    if (module.is_configured && module.module_type == "HOTEL") {
      nav({
        to: "/orchestrator/property/$propertyId/domain_hospitality/hotel_dashboard/$hotelId",
        params: {
          hotelId: module.id,
          propertyId: propertyId,
        },
      });
    } else if (module.module_type == "RESTAURANT") {
      nav({
        to: "/orchestrator/property/$propertyId/domain_hospitality/restaurant_dashboard/$restaurantID",
        params: {
          propertyId: propertyId,
          restaurantID: module.id,
        },
      });
    }
  };

  const handlePropertySettingPage = () => {
    nav({
      to: "/orchestrator/property/$propertyId/property_settings",
      params: {
        propertyId: propertyId,
      },
    });
  };

  const { showModal, closeModal } = useFormsModal();
  const handleAddModules = (domain: string) => {
    showModal(
      "Add Modules",
      "Choose Modules",
      <AddModulesInProperty
        domain={domain}
        propertyID={propertyId}
        closeModal={closeModal}
      />,
    );
  };

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
      <Card className="group transition-all hover:shadow-md">
        <CardHeader className="space-y-4">
          {/* Top Row */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle className="text-lg leading-tight">
                {property?.name}
              </CardTitle>

              {/* Domain */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Domain:</span>
                <SB variant="secondary" className="text-xs">
                  Hospitality
                </SB>
              </div>
            </div>

            <Button
              onClick={handlePropertySettingPage}
              size="sm"
              className="shrink-0"
            >
              <WrenchIcon className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>

          {/* Address */}
          <CardDescription>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                {[
                  property?.address_line,
                  property?.city,
                  property?.state,
                  property?.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          </CardDescription>
        </CardHeader>

        <CardFooter className="border-t pt-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <AlertCircleIcon className="mr-2 h-4 w-4" />
            Learn more about this domain
          </Button>
        </CardFooter>
      </Card>

      {/* Modules */}
      <Card className="relative">
        <CardHeader>
          <CardTitle>Modules</CardTitle>
        </CardHeader>
        <Button
          className="absolute top-3.5 right-3.5"
          onClick={() => handleAddModules(property?.domain)}
        >
          <PlusCircleIcon />
          Add Modules
        </Button>
        <CardContent className="grid gap-3.5 sm:grid-cols-3">
          {property?.__modules__data__?.map((module: ModulesDetailsDto) => (
            <Card
              key={module.id}
              className="h-fit relative hover:border-2 hover:border-accent-foreground transform transition-transform duration-300 ease-out hover:scale-[1.01] hover:-translate-y-0.3 hover:shadow-xl"
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
              {module.module_type && (
                <SB className="absolute top-3.5 right-3.5">
                  {module.module_type}
                </SB>
              )}
              {!module.is_configured && (
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
                {!module.is_configured ? (
                  <Button
                    onClick={() => handleModuleConfigure(module)}
                    className="w-full"
                    variant={"outline"}
                  >
                    Configure
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    onClick={() => handleModuleNav(module)}
                  >
                    Go to Module <ArrowRight />
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
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
          {property?.infra?.map((inf: PropertyInfraResDto) => (
            <Card key={inf.id}>
              <CardHeader>
                {inf.name}
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
// function PropertyDetailsSkeleton() {
//   return (
//     <div className="space-y-4">
//       {Array.from({ length: 1 }).map((_, i) => (
//         <Card key={i}>
//           <CardHeader>
//             <Skeleton className="h-4 w-1/3" />
//           </CardHeader>
//           <CardContent className="space-y-2">
//             <Skeleton className="h-4 w-full" />
//             <Skeleton className="h-4 w-2/3" />
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }
