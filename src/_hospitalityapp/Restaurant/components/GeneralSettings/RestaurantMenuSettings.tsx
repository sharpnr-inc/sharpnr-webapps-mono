import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface RestaurantMenuSettingsProps {}

const RestaurantMenuSettings: React.FC<RestaurantMenuSettingsProps> = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>this is menu page</CardTitle>
        </CardHeader>
      </Card>{" "}
    </div>
  );
};

export default RestaurantMenuSettings;


// Step *1 here we need the Menu compound component