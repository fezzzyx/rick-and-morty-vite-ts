import { useQuery } from "@tanstack/react-query";
import { LocationService } from "@/services/rick-and-morty/location.service.ts";
import { useLocationsFilterStore } from "@/store/useLocationFilterStore.ts";
import type { Location } from "@/types/location.type.ts";
import type { IInfo } from "@/types/pagination.type.ts";

export const useLocationsQuery = () => {
    const filters = JSON.parse(JSON.stringify(useLocationsFilterStore()));

    return useQuery({
        queryKey: ["locations", filters],
        queryFn: () =>
            LocationService.getLocations(filters).then(
                (res) => res?.data as { results: Location[]; info: IInfo }
            )
    });
};
