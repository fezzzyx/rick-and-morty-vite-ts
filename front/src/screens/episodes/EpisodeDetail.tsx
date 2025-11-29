import { useParams, Link, useNavigate } from "react-router";
import AnimatedWrapper from "@/components/AnimatedWrapper.tsx";
import type { Episode } from "@/types/episode.type.ts";
import {episodeQuery, episodesQuery} from "@/hooks/episodes/episodesQuery.ts";

export default function EpisodeDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    // Fetch main episode
    const { data: episode, isLoading, isError } = episodeQuery(Number(id));

    // Fetch suggested episodes
    const { data: allEpisodes } = episodesQuery();

    if (isLoading) return <p className="text-center mt-4">Loading episode...</p>;
    if (isError || !episode) return <p className="text-center mt-4 text-red-500">Episode not found</p>;

    // Filter out current episode
    const suggested = allEpisodes?.filter((e: Episode) => e.id !== episode.id).slice(0, 8);

    return (
        <AnimatedWrapper>
            <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
                {/* Back Button */}
                <Link
                    to="/episodes"
                    className="inline-block mb-6 text-sky-500 font-semibold hover:underline"
                >
                    &larr; Back to Episodes
                </Link>

                {/* Main Episode Info */}
                <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{episode.name}</h1>
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Episode Code:</span> {episode.episode}</p>
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Air Date:</span> {episode.air_date}</p>
                        <p className="text-gray-600 mt-4">
                            <span className="font-semibold">Characters in this episode:</span> {episode.characters.length}
                        </p>
                    </div>
                </div>

                {/* Suggested Episodes */}
                {suggested?.length ? (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Suggested Episodes</h2>
                        <div className="flex gap-4 overflow-x-auto py-2">
                            {suggested.map((ep: Episode) => (
                                <div
                                    key={ep.id}
                                    className="bg-white rounded-xl shadow p-4 min-w-[180px] flex-shrink-0 text-center hover:shadow-lg transition"
                                >
                                    <p className="font-semibold text-gray-800">{ep.name}</p>
                                    <p className="text-gray-500 text-sm mb-1">{ep.episode}</p>
                                    <p className="text-gray-500 text-sm mb-2">{ep.air_date}</p>
                                    <button
                                        onClick={() => navigate(`/episodes/${ep.id}`)}
                                        className="mt-2 px-3 py-1 bg-sky-500 text-white font-semibold rounded-full shadow hover:bg-sky-600 transition-all text-sm"
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
