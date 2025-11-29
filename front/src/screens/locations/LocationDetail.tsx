// /screens/rick-and-morty/locations/LocationDetail.tsx
import { useParams, useNavigate } from "react-router";
import { useLocationsQuery } from "./hooks/useLocationsQuery.ts";
import AnimatedWrapper from "@/components/AnimatedWrapper.tsx";
import {locationQuery} from "@/hooks/locations/locationsQuery.ts";

export default function LocationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    // Current location
    const { data: location, isFetching } = locationQuery(Number(id));

    // All locations for carousel
    const { data: allLocations } = useLocationsQuery();

    if (isFetching || !location) {
        return <p className="text-center mt-4 text-gray-500">Loading location...</p>;
    }

    const suggested = allLocations?.results?.filter((loc) => loc.id !== location.id) || [];

    return (
        <AnimatedWrapper>
            <div className="max-w-7xl mx-auto px-6 py-20">
                {/* Main Location Info */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-4 text-center">{location.name}</h1>
                    <div className="flex flex-col md:flex-row justify-center gap-12 mt-6">
                        <div className="text-center md:text-left">
                            <p className="text-gray-600 text-lg mb-2"><span className="font-semibold">Type:</span> {location.type}</p>
                            <p className="text-gray-600 text-lg"><span className="font-semibold">Dimension:</span> {location.dimension}</p>
                        </div>
                        <div className="text-center md:text-left">
                            <p className="text-gray-500 text-sm">ID: {location.id}</p>
                            <p className="text-gray-500 text-sm">Created: {new Date(location.created).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>

                {/* Carousel of Other Locations */}
                {suggested?.length ? (
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Other Locations</h2>
                        <div className="flex gap-6 overflow-x-auto py-2 px-2">
                            {suggested.map((loc) => (
                                <div
                                    key={loc.id}
                                    className="bg-white rounded-xl shadow-lg p-4 min-w-[200px] flex-shrink-0 text-center hover:shadow-2xl transition cursor-pointer"
                                >
                                    <p className="font-semibold text-gray-800 text-lg mb-1">{loc.name}</p>
                                    <p className="text-gray-500 text-sm mb-1">Type: {loc.type}</p>
                                    <p className="text-gray-500 text-sm mb-2">Dimension: {loc.dimension}</p>
                                    <button
                                        onClick={() => navigate(`/locations/${loc.id}`)}
                                        className="mt-2 px-4 py-1 bg-sky-500 text-white font-semibold rounded-full shadow hover:bg-sky-600 transition-all text-sm"
                                    >
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}
            </div>
        </AnimatedWrapper>
    );
}
