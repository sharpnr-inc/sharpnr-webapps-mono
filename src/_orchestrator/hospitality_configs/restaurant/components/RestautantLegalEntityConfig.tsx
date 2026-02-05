import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RestaurantLegalEntityConfigProps {}

const RestaurantLegalEntityConfig: React.FC<
  RestaurantLegalEntityConfigProps
> = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Restaurant legal Entity</CardTitle>
          <CardDescription>
            Attach the legal entity available in Organization or Create a new,
            legal entity is responsible for recording the accounting and
            taxcodes
          </CardDescription>
        </CardHeader>
        <CardContent>
            
        </CardContent>
        <CardFooter>
          <Button>Save & finish configuration</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RestaurantLegalEntityConfig;
