import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface RestaurantLayoutConfigProps {}

const RestaurantLayoutConfig: React.FC<RestaurantLayoutConfigProps> = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Restaurants Layout</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default RestaurantLayoutConfig;
