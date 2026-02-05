import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RestaurantLayoutConfigProps {}

const RestaurantLayoutConfig: React.FC<RestaurantLayoutConfigProps> = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Restaurants Layout</CardTitle>
          <CardDescription>
            here setup the layout of Restaurant floors, and Rooms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Layout</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RestaurantLayoutConfig;
