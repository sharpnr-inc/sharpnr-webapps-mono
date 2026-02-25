import { routeTree } from "@/routeTree.gen";
import { createRouteMask } from "@tanstack/react-router";

export const propertyDetailsMask = createRouteMask({
  routeTree,
  from: "/orchestrator/property/$propertyId/details",
  to: "/orchestrator/property",
  params: true,
});

export const hotelDetailMask = createRouteMask({
    routeTree,
    from:"/orchestrator/property/$propertyId/domain_hospitality/hotel_config/$hotelId/configuration",
    to:"/orchestrator/property/routes",
    params:true
})