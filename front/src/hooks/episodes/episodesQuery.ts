import { useQuery } from "@tanstack/react-query";
import { EpisodeService } from "@/services/rick-and-morty/episode.service.ts";
import type { Episode } from "@/types/episode.type.ts";
import {useEpisodesFilterStore} from "@/store/useEpisodeFilterStore.ts";

export const episodeQuery = (id: number | undefined) => {
    return useQuery({
        queryKey: ["episode", id],
        queryFn: () =>
            EpisodeService.getEpisodeById(id!).then((res) => res.data as Episode),
        enabled: !!id,
    });
};

export const episodesQuery = () => {
    const filters = JSON.parse(JSON.stringify(useEpisodesFilterStore()));

    return useQuery({
        queryKey: ["episodes", filters],
        queryFn: () =>
            EpisodeService.getEpisodes(filters).then((res) => res.data.results as Episode[]),
    });
};
