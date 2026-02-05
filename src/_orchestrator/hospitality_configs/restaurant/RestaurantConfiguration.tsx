import RestaurantInfraAccessConfig from "./components/RestaurantInfraAccessConfig";
import RestaurantLayoutConfig from "./components/RestaurantLayoutConfig";
import RestaurantTimingConfig from "./components/RestaurantTimingConfig";
import RestaurantLegalEntityConfig from "./components/RestautantLegalEntityConfig";

interface RestaurantConfigurationProps {}

const RestaurantConfiguration: React.FC<RestaurantConfigurationProps> = () => {
  return (
    <div className="p-2 mt-4 space-y-2.5">
      <RestaurantTimingConfig />
      <RestaurantLayoutConfig />
      <RestaurantInfraAccessConfig/>
      <RestaurantLegalEntityConfig/>
    </div>
  );
};

export default RestaurantConfiguration;
