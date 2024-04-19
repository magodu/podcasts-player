export type PodcastsType = {
    id: string;
    img: string;
    name: string;
    author: string;
    summary: string;
};

export type EpisodeType = {
    id: string;
    title: string;
    date: string;
    duration: string;
    content: string;
    url: string;
};

export type PodcastDetailType = {
    id: string;
    artwork: string;
    name: string;
    feedUrl: string;
    artistName: string;
    episodes?: EpisodeType[];
    description?: string;
    podcastTimestamp?: number;
};

export type PodcastsData = {
    podcastsList?: PodcastsType[];
    podcastsDetail?: { [key: string]: PodcastDetailType };
};

export type SiteContextType = {
    data: PodcastsData;
    isLoading: boolean,
    errorLoading: boolean,
    setData: (data: any) => void; 
    setLoading: (isLoading: boolean) => void; 
};

export type LSDataType = { 
    podcastsList?: any;
    podcastsDetail?: any,
    podcastsListTimestamp?: number;
};

export interface localStorageDataType {
    data: LSDataType;
};

export interface InputProps {
    children: React.ReactElement;
}

