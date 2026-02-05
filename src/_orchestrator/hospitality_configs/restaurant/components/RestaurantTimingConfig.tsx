import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

          <CardContent className="space-y-2">
            <div className="space-y-2">
              <Label>Restaurant Name</Label>
              <Input placeholder="ex Dearie Restaurant" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Restaurant Opening timing</Label>
                <Input placeholder="ex Dearie Restaurant" />
              </div>
              <div className="space-y-2">
                <Label>Restaurant closing timing</Label>
                <Input placeholder="ex Dearie Restaurant" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save General Info</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default RestaurantTimingConfig;
