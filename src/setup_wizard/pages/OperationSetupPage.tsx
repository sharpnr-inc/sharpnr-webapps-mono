import { SetupPropertyForm } from "../components/SetUpPropertyForm";

export function OperationSetUpPage() {
  return (
    <div className="flex min-h-screen justify-center bg-muted/30 p-6">
      <div className="w-full max-w-xl">
        <SetupPropertyForm />
      </div>
    </div>
  );
}
