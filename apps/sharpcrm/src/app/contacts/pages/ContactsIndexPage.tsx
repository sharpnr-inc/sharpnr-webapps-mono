import FeaturePlaceholder from "@/shared/FeaturePlaceholder";
import { Contact } from "lucide-react";

function ContactsIndexPage() {
  return (
    <FeaturePlaceholder
      icon={Contact}
      title="Contacts"
      description="The people you deal with, with the full history of every interaction attached."
      capabilities={[
        "Contact profile with communication history",
        "Association to companies, deals and activities",
        "Custom fields and tagging",
        "Import, export and duplicate merging",
        "Consent and subscription status per channel",
      ]}
    />
  );
}

export default ContactsIndexPage;
