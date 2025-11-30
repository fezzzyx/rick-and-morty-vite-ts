import { useParams, Link } from "react-router";
import AnimatedWrapper from "@/components/AnimatedWrapper.tsx";
import {episodeQuery} from "@/hooks/episodes/episodesQuery.ts";

export default function EpisodeDetail() {
    const { id } = useParams<{ id: string }>();

    const { data: episode, isLoading, isError } = episodeQuery(Number(id));


    if (isLoading) return <p className="text-center mt-4">Loading episode...</p>;
    if (isError || !episode) return <p className="text-center mt-4 text-red-500">Episode not found</p>;


    return (
        <AnimatedWrapper>
            <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
                <Link
                    to="/episodes"
                    className="inline-block mb-6 text-sky-500 font-semibold hover:underline"
                >
                    &larr; Back to Episodes
                </Link>

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

            </div>
        </AnimatedWrapper>
    );
}
