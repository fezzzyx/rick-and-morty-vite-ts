import { useQuery } from "@tanstack/react-query";
import { CharacterService } from "@/services/rick-and-morty/character.service.ts";
import { useCharactersFilterStore } from "@/store/useCharacterFilterStore.ts";
import type { Character } from "@/types/character.type.ts";
import type { IInfo } from "@/types/pagination.type.ts";

export const useCharactersQuery = () => {
    const filters = JSON.parse(JSON.stringify(useCharactersFilterStore()));

    return useQuery({
        queryKey: ["characters", filters],
        queryFn: () =>
            CharacterService.getCharacters(filters).then(
                (res) => res?.data as { results: Character[]; info: IInfo }
            ),
    });
};
