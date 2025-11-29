import { useQuery } from "@tanstack/react-query";
import { CharacterService } from "@/services/rick-and-morty/character.service.ts";
import type {Character} from "@/types/character.type.ts";

export const charactersQuery = ({ page = 1, name }: { page?: number; name?: string } = {}) => {
    return useQuery({
        queryKey: ["characters", page, name],
        queryFn: () =>
            CharacterService.getCharacters({ page, name }).then(
                (data) => data.data.results as Array<Character>
            ),

    });
};

export const characterQuery = (id: number | undefined) => {
    return useQuery({
        queryKey: ["character", id],
        queryFn: () =>
            CharacterService.getCharacterById(id!).then((data) => data.data as Character),
        enabled: !!id,
    });
};