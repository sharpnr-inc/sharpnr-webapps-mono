import {
  InputSelect,
  InputSelectTrigger,
} from "@/components/ui/AddressInputCard";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { createCountriesQuery } from "@/api_service/queries/Shared/useUtils";
import { MenuTerminal } from "@/features/Hospitality/MenuTerminal/Menu";

export const Route = createFileRoute("/dashboard/_layout/")({
  component: AddrCard,
});

function AddrCard() {
  const countryList = useQuery(createCountriesQuery());
  return (
    <div className="p-4 rounded shadow border-2">
      <h2 className="text-xl font-bold mb-2">Dashboard Home</h2>
      <p className="mb-5">Welcome to your dashboard!</p>
      <InputSelect options={countryList?.data?.data ?? []}>
        {(provided) => <InputSelectTrigger {...provided} />}
      </InputSelect>

      <MenuTerminal>
        <MenuTerminal.Header />

        <MenuTerminal.Body>
          <MenuTerminal.Categories />
          <MenuTerminal.Items />
        </MenuTerminal.Body>

        <MenuTerminal.Footer />
      </MenuTerminal>
    </div>
  );
}
