import { useQuery } from "@tanstack/react-query";
import { EpisodeService } from "@/services/rick-and-morty/episode.service.ts";
import { useEpisodesFilterStore } from "@/store/useEpisodeFilterStore.ts";
import type { Episode } from "@/types/episode.type.ts";
import type { IInfo } from "@/types/pagination.type.ts";

export const useEpisodesQuery = () => {
    const filters = JSON.parse(JSON.stringify(useEpisodesFilterStore()));

    return useQuery({
        queryKey: ["episodes", filters],
        queryFn: () =>
            EpisodeService.getEpisodes(filters).then((res) => res?.data as { results: Episode[]; info: IInfo }),
    });
};
