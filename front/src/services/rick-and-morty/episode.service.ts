import { api } from "@/services/api/interseptors.api.ts";
import { getEpisodesUrl, getEpisodeUrl } from "@/config/api.config.ts";

export const EpisodeService = {
    getEpisodes: ({ page = 1, name, episode }: { page?: number; name?: string; episode?: string } = {}) =>
        api({
            url: getEpisodesUrl(),
            method: "GET",
            params: { page, name, episode },
        }),
    getEpisodeById: (id: number) =>
        api({
            url: getEpisodeUrl().replace(":id", String(id)),
            method: "GET",
        }),
};
