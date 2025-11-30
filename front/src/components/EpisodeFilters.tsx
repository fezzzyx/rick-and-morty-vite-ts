
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce/useDebounce.ts";
import { useEpisodesFilterStoreWithParams } from "@/store/useEpisodeFilterStore.ts";

export default function EpisodeFilters() {
    const { name, episode, setFilter, resetFilters } = useEpisodesFilterStoreWithParams();

    const [localName, setLocalName] = useState(name);
    const [localEpisode, setLocalEpisode] = useState(episode);

    const debouncedName = useDebounce(localName, 500);
    const debouncedEpisode = useDebounce(localEpisode, 500);

    useEffect(() => {
        if (debouncedName.length > 2 || debouncedName === "") {
            setFilter("name", debouncedName);
        }
    }, [debouncedName, setFilter]);

    useEffect(() => {
        if (debouncedEpisode.length > 1 || debouncedEpisode === "") {
            setFilter("episode", debouncedEpisode);
        }
    }, [debouncedEpisode, setFilter]);

    return (
        <div className="grid grid-cols-2 gap-4 mb-6">
            <input
                type="text"
                placeholder="Search by name"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                placeholder="Search by episode code"
                value={localEpisode}
                onChange={(e) => setLocalEpisode(e.target.value)}
                className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
                onClick={resetFilters}
                className="col-span-2 mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 shadow-sm font-medium"
            >
                Reset Filters
            </button>
        </div>
    );
}
