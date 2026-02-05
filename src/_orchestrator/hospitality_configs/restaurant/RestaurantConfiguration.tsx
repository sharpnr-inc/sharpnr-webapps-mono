import RestaurantLayoutConfig from "./components/RestaurantLayoutConfig";
import RestaurantTimingConfig from "./components/RestaurantTimingConfig";

interface RestaurantConfigurationProps {}

const RestaurantConfiguration: React.FC<RestaurantConfigurationProps> = () => {
  return (
    <div className="p-2 mt-4 space-y-2.5">
      <RestaurantTimingConfig />
      <RestaurantLayoutConfig />
    </div>
  );
};

export default RestaurantConfiguration;
