import { useNavigate } from "react-router";
import { useCharactersQuery } from "./hooks/useCharactersQuery.ts";
import CharacterFilters from "@/components/CharacterFilters.tsx";
import Pagination from "@/components/pagination/Pagination.tsx";
import { useCharactersFilterStoreWithParams } from "@/store/useCharacterFilterStore.ts";
import AnimatedWrapper from "@/components/AnimatedWrapper.tsx";

export default function CharacterList() {
    const { data, isFetching } = useCharactersQuery();
    const { results, info } = data || {};
    const { page, setFilter } = useCharactersFilterStoreWithParams();
    const navigate = useNavigate();

    const currentPage = Number(page) || 1;
    const totalPages = Number(info?.pages) || 1;

    return (
        <AnimatedWrapper>
            <div className="max-w-7xl mx-auto px-6 py-20">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                    Rick & Morty Characters
                </h1>

                <CharacterFilters />

                {isFetching ? (
                    <p className="text-center text-gray-500">Loading characters...</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {results?.map((char) => (
                            <div
                                key={char.id}
                                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer overflow-hidden p-4 text-center"
                                onClick={() => navigate(`/characters/${char.id}`)}
                            >
                                <img
                                    src={char.image}
                                    alt={char.name}
                                    className="rounded-t-xl w-full object-cover mb-2"
                                />
                                <p className="font-semibold text-gray-800 text-lg mb-1">{char.name}</p>
                                <p className="text-gray-500 text-sm mb-1">Status: {char.status}</p>
                                <p className="text-gray-500 text-sm">Species: {char.species}</p>
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
