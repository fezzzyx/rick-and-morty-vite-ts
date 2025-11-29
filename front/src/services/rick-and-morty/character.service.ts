
import { api } from "@/services/api/interseptors.api.ts";
import { getCharactersUrl, getCharacterUrl } from "@/config/api.config.ts";

export const CharacterService = {
    getCharacters: ({
                        page = 1,
                        name,
                        status,
                        species,
                    }: { page?: number; name?: string; status?: string; species?: string } = {}) =>
        api({
            url: getCharactersUrl(),
            method: "GET",
            params: { page, name, status, species },
        }),

    getCharacterById: (id: number) =>
        api({
            url: getCharacterUrl().replace(":id", String(id)),
            method: "GET",
        }),
};
