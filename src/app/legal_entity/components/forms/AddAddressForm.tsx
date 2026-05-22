import { useAppForm } from "@/components/forms";

interface AddAddressFormProps {
  CloseModal: () => void;
  legalEntityID: string;
}
export function AddAddressForm({}: AddAddressFormProps) {
  const form = useAppForm({});
  return <div></div>;
}
