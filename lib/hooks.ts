import { Playlist, User } from "@prisma/client";
import useSWR from "swr";
import fetcher from "./fetcher";

type CombinedUserType = User & { playListCount: number };

export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);

  return {
    user: data as CombinedUserType,
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylist = () => {
  const { data, error } = useSWR("/playlist", fetcher);

  return {
    playLists: (data as unknown as Playlist[]) || [],
    isLoading: !data && !error,
    isError: error,
  };
};
