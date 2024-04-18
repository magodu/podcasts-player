export interface localStorageDataType {
    data: any;
};

export type PodcastsType = {    // TODO: CHANGE Obj for Type
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
};

export type PodcastsData = {
    podcastsList?: any[];
    podcastsDetail?: any,
};

export type SiteContextObj = {
    data: PodcastsData;
    isLoading: boolean,
    errorLoading: boolean,
    setData: (data: any) => void; 
    setLoading: (isLoading: boolean) => void; 
};

export interface InputProps {
    children: React.ReactElement;
}

