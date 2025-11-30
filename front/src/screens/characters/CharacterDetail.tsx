import { useParams, Link, useNavigate } from "react-router";
import { characterQuery } from "@/hooks/characters/charactersQuery.ts";
import { charactersQuery } from "@/hooks/characters/charactersQuery.ts";
import AnimatedWrapper from "@/components/AnimatedWrapper.tsx";
import type { Character } from "@/types/character.type.ts";

export default function CharacterDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data: character, isLoading, isError } = characterQuery(Number(id));

    const { data: suggestedCharacters } = charactersQuery({ page: 1 });

    if (isLoading) return <p className="text-center mt-4">Loading character...</p>;
    if (isError || !character) return <p className="text-center mt-4 text-red-500">Character not found</p>;

    const suggested = suggestedCharacters?.filter((c: Character) => c.id !== character.id).slice(0, 8);



    return (
        <AnimatedWrapper>
            <div className="max-w-7xl mx-auto px-6 py-20 space-y-16">
                <Link
                    to="/characters"
                    className="inline-block mb-6 text-sky-500 font-semibold hover:underline"
                >
                    &larr; Back to Characters l {/*&larr - это просто значок стрелочки*/}
                </Link>

                <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-8">
                    <img
                        src={character.image}
                        alt={character.name}
                        className="w-64 h-64 rounded-xl object-cover shadow-md"
                    />

                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{character.name}</h1>

                        <p className="text-gray-600 mb-2"><span className="font-semibold">Status:</span> {character.status}</p>
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Species:</span> {character.species}</p>
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Gender:</span> {character.gender ?? "Unknown"}</p>
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Origin:</span> {character.origin?.name ?? "Unknown"}</p>
                        <p className="text-gray-600 mb-2"><span className="font-semibold">Location:</span> {character.location?.name ?? "Unknown"}</p>

                        {character.episode?.length && (
                            <p className="text-gray-600 mt-4">
                                <span className="font-semibold">Appears in:</span> {character.episode.length} episode(s)
                            </p>
                        )}
                    </div>
                </div>

                {suggested?.length ? (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Suggested Characters</h2>
                        <div className="flex gap-4 overflow-x-auto py-2">
                            {suggested.map((char: Character) => (
                                <div
                                    key={char.id}
                                    className="bg-white rounded-xl shadow p-4 min-w-[180px] flex-shrink-0 text-center hover:shadow-lg transition"
                                >
                                    <img
                                        src={char.image}
                                        alt={char.name}
                                        className="rounded-t-xl w-full object-cover mb-2"
                                    />
                                    <p className="font-semibold text-gray-800">{char.name}</p>
                                    <p className="text-gray-500 text-sm">Status: {char.status}</p>
                                    <p className="text-gray-500 text-sm mb-2">Species: {char.species}</p>
                                    <button
                                        onClick={() => navigate(`/characters/${char.id}`)}
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
