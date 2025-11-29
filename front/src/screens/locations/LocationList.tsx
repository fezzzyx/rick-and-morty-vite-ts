// /screens/rick-and-morty/locations/LocationList.tsx
import { useNavigate } from "react-router";
import { useLocationsQuery } from "./hooks/useLocationsQuery.ts";
import LocationFilters from "../../components/LocationFilters.tsx";
import Pagination from "@/components/pagination/Pagination.tsx";
import { useLocationsFilterStoreWithParams } from "@/store/useLocationFilterStore.ts";
import AnimatedWrapper from "@/components/AnimatedWrapper.tsx";

export default function LocationList() {
    const { data, isFetching } = useLocationsQuery();
    const { results, info } = data || {};
    const { page, setFilter } = useLocationsFilterStoreWithParams();
    const navigate = useNavigate();

    const currentPage = Number(page) || 1;
    const totalPages = Number(info?.pages) || 1;

    return (
        <AnimatedWrapper>
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                    Rick & Morty Locations
                </h1>

                <LocationFilters />

                {isFetching ? (
                    <p className="text-center text-gray-500">Loading locations...</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {results?.map((location) => (
                            <div
                                key={location.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden p-4 text-center"
                                onClick={() => navigate(`/locations/${location.id}`)}
                            >
                                <p className="font-semibold text-gray-800 text-lg mb-1">{location.name}</p>
                                <p className="text-gray-500 text-sm mb-1">Type: {location.type}</p>
                                <p className="text-gray-500 text-sm">Dimension: {location.dimension}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 flex justify-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={(page) => setFilter("page", String(page))}
                        siblingCount={1}
                    />
                </div>
            </div>
        </AnimatedWrapper>
    );
}
