import { useNavigate } from "react-router";
import { useEpisodesQuery } from "./hooks/useEpisodesQuery.ts";
import EpisodeFilters from "@/components/EpisodeFilters.tsx";
import Pagination from "@/components/pagination/Pagination.tsx";
import { useEpisodesFilterStoreWithParams } from "@/store/useEpisodeFilterStore.ts";
import AnimatedWrapper from "@/components/AnimatedWrapper.tsx";

export default function EpisodeList() {
    const { data, isFetching } = useEpisodesQuery();
    const { results, info } = data || {};
    const { page, setFilter } = useEpisodesFilterStoreWithParams();
    const navigate = useNavigate();

    const currentPage = Number(page) || 1;
    const totalPages = Number(info?.pages) || 1;

    return (
        <AnimatedWrapper>
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                    Rick & Morty Episodes
                </h1>

                <EpisodeFilters />

                {isFetching ? (
                    <p className="text-center text-gray-500">Loading episodes...</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {results?.map((ep) => (
                            <div
                                key={ep.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden p-4 text-center"
                                onClick={() => navigate(`/episodes/${ep.id}`)}
                            >
                                <p className="font-semibold text-gray-800 text-lg mb-1">{ep.name}</p>
                                <p className="text-gray-500 text-sm mb-1">Episode: {ep.episode}</p>
                                <p className="text-gray-500 text-sm">Air Date: {ep.air_date}</p>
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
