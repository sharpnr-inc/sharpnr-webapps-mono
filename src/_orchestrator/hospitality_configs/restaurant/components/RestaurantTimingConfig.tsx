import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RestaurantTimingProps {}

const RestaurantTimingConfig: React.FC<RestaurantTimingProps> = () => {
  return (
    <div>
      <form>
        <Card>
          <CardHeader>
            <CardTitle>Restaurant General Info.</CardTitle>
            <CardDescription>
              Section for restaurant timing, restaurant name
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div>
                
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default RestaurantTimingConfig;
