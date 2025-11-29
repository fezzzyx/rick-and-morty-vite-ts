// /components/CharacterFilters.tsx
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce/useDebounce.ts";
import { useCharactersFilterStoreWithParams } from "@/store/useCharacterFilterStore.ts";

export default function CharacterFilters() {
    const { name, status, species, setFilter, resetFilters } = useCharactersFilterStoreWithParams();

    const [localName, setLocalName] = useState(name);
    const [localStatus, setLocalStatus] = useState(status);
    const [localSpecies, setLocalSpecies] = useState(species);

    const debouncedName = useDebounce(localName, 500);
    const debouncedStatus = useDebounce(localStatus, 500);
    const debouncedSpecies = useDebounce(localSpecies, 500);

    useEffect(() => {
        if (debouncedName.length > 2 || debouncedName === "") setFilter("name", debouncedName);
    }, [debouncedName, setFilter]);

    useEffect(() => {
        if (debouncedStatus.length > 2 || debouncedStatus === "") setFilter("status", debouncedStatus);
    }, [debouncedStatus, setFilter]);

    useEffect(() => {
        if (debouncedSpecies.length > 2 || debouncedSpecies === "") setFilter("species", debouncedSpecies);
    }, [debouncedSpecies, setFilter]);

    return (
        <div className="grid grid-cols-3 gap-4 mb-6">
            <input
                type="text"
                placeholder="Пошук за ім'ям"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                placeholder="Пошук за статусом"
                value={localStatus}
                onChange={(e) => setLocalStatus(e.target.value)}
                className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                placeholder="Пошук за видом"
                value={localSpecies}
                onChange={(e) => setLocalSpecies(e.target.value)}
                className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
                onClick={resetFilters}
                className="col-span-3 mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 shadow-sm font-medium"
            >
                Скинути фільтри
            </button>
        </div>
    );
}
