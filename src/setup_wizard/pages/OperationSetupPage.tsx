import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sharpnr/ui";
import { ArrowLeft, Building2, CheckCircle2 } from "lucide-react";
import { SetupPropertyForm } from "../components/SetUpPropertyForm";
import { SetupLegalEntityForm } from "../components/SetUpLegalEntityForm";

type Selection = "legal_entity" | "property" | null;

const CARDS = [
  {
    id: "property" as const,
    icon: Building2,
    tag: "Sharp-Hospitality",
    title: "Property",
    subtitle: "A physical location you operate",
    description:
      "A Property is any physical location your business runs from — a hotel, resort, office, or venue. Required to activate Sharp-Hospitality and operations management.",
    perks: [
      "Enable Sharp-Hospitality for your venue",
      "Manage rooms, bookings & housekeeping",
      "Track operations per physical location",
      "Add multiple properties as you grow",
    ],
    required: "Required for Hospitality",
  },
];

function SelectionCard({
  card,
  onSelect,
}: {
  card: (typeof CARDS)[number];
  onSelect: () => void;
}) {
  const Icon = card.icon;

  return (
    <button type="button" onClick={onSelect} className="w-full text-left">
      <Card className="transition-colors hover:bg-accent/50">
        <CardHeader>
          <Badge variant="secondary">{card.tag}</Badge>
          <CardTitle className="flex items-center gap-2">
            <Icon className="size-4" />
            {card.title}
          </CardTitle>
          <CardDescription>{card.subtitle}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{card.description}</p>

          <ul className="space-y-2">
            {card.perks.map((perk) => (
              <li key={perk} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <p className="border-t pt-3 text-xs uppercase tracking-wide text-muted-foreground">
            {card.required}
          </p>
        </CardContent>
      </Card>
    </button>
  );
}

function CardSelectionView({ onSelect }: { onSelect: (s: Selection) => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Step 03 of 03
        </p>
        <h2 className="text-xl font-semibold">
          What does your operation need?
        </h2>
        <p className="text-sm text-muted-foreground">
          You must create at least one. You can add more entities after setup is
          complete.
        </p>
      </div>

      <div className="space-y-4">
        {CARDS.map((card) => (
          <SelectionCard
            key={card.id}
            card={card}
            onSelect={() => onSelect(card.id)}
          />
        ))}
      </div>
    </div>
  );
}

function FormView({
  selection,
  onBack,
}: {
  selection: NonNullable<Selection>;
  onBack: () => void;
}) {
  const card = CARDS.find((c) => c.id === selection);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button type="button" variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft />
          Back
        </Button>
        <span className="text-sm text-muted-foreground">
          Create {card?.title ?? "entity"}
        </span>
      </div>

      {selection === "legal_entity" ? (
        <SetupLegalEntityForm />
      ) : (
        <SetupPropertyForm />
      )}
    </div>
  );
}

export function OperationSetUpPage() {
  const [selection, setSelection] = useState<Selection>(null);

  return (
    <div className="flex min-h-screen justify-center bg-muted/30 p-6">
      <div className="w-full max-w-xl">
        {selection === null ? (
          <CardSelectionView onSelect={setSelection} />
        ) : (
          <FormView selection={selection} onBack={() => setSelection(null)} />
        )}
      </div>
    </div>
  );
}
