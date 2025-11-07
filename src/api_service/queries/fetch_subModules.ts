import { queryOptions } from "@tanstack/react-query";
import { getSubModulesOfBusinessLogicModule } from "../apis/utility_api";

export default function createGetSubModuleQuery(module_name: string) {
  return queryOptions({
    queryKey: ["UTILITY_SUB_MODULES", module_name],
    queryFn: () => getSubModulesOfBusinessLogicModule(module_name),
  });
}

