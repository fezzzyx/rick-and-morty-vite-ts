import {api} from "@/services/api/interseptors.api.ts";
import {getLocationsUrl, getLocationUrl} from "@/config/api.config.ts";

export const LocationService = {
    getLocations: ({ page = 1, name, type, dimension }: { page?: number; name?: string; type?: string; dimension?: string } = {}) =>
        api({
            url: getLocationsUrl(),
            method: "GET",
            params: { page, name, type, dimension },
        }),

    getLocationById: (id: number) =>
        api({
            url: getLocationUrl().replace(":id", String(id)),
            method: "GET",
        }),
};
