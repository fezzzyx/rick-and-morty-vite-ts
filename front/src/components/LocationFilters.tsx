
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce/useDebounce.ts";
import { useLocationsFilterStoreWithParams } from "@/store/useLocationFilterStore.ts";

export default function LocationFilters() {
    const { name, type, dimension, setFilter, resetFilters } =
        useLocationsFilterStoreWithParams();

    const [localName, setLocalName] = useState(name);
    const [localType, setLocalType] = useState(type);
    const [localDimension, setLocalDimension] = useState(dimension);

    const debouncedName = useDebounce(localName, 500);
    const debouncedType = useDebounce(localType, 500);
    const debouncedDimension = useDebounce(localDimension, 500);

    useEffect(() => {
        if (debouncedName.length > 2 || debouncedName === "") {
            setFilter("name", debouncedName);
        }
    }, [debouncedName, setFilter]);

    useEffect(() => {
        if (debouncedType.length > 2 || debouncedType === "") {
            setFilter("type", debouncedType);
        }
    }, [debouncedType, setFilter]);

    useEffect(() => {
        if (debouncedDimension.length > 2 || debouncedDimension === "") {
            setFilter("dimension", debouncedDimension);
        }
    }, [debouncedDimension, setFilter]);

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
                placeholder="Пошук за типом"
                value={localType}
                onChange={(e) => setLocalType(e.target.value)}
                className="border border-gray-300 p-2 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
                type="text"
                placeholder="Пошук за виміром"
                value={localDimension}
                onChange={(e) => setLocalDimension(e.target.value)}
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
