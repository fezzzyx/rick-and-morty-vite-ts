import { useQuery } from "@tanstack/react-query";
import { LocationService } from "@/services/rick-and-morty/location.service.ts";
import type { Location } from "@/types/location.type.ts";

export const locationQuery = (id: number | undefined) => {
    return useQuery({
        queryKey: ["location", id],
        queryFn: () =>
            LocationService.getLocationById(id!).then((data) => data.data as Location),
        enabled: !!id,
    });
};
