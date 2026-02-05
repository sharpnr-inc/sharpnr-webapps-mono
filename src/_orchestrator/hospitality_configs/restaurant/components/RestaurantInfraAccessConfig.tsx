import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RestaurantInfraAccessConfigProps {}

const RestaurantInfraAccessConfig: React.FC<
  RestaurantInfraAccessConfigProps
> = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Property's Infra Access</CardTitle>
          <CardDescription>
            Choose what modules you want to use of property or create your own
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div>

            </div>
        </CardContent>
        <CardFooter>
          <Button>Save access</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RestaurantInfraAccessConfig;
