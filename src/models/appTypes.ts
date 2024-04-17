export interface localStorageDataType {
    token: string;
    expirationTime: string;
    loginData: any;
    infoResultPayload: any;
    playerData: any;
    playerStatistics: any;
    catalog: any;
};

export type PodcastsObj = {
    id: string;
    img: string;
    name: string;
    author: string;
    summary: string;
};

export type PodcastsData = {
    podcastsList?: any;
    podcastsDetail?: any,
};

export type SiteContextObj = {
    data: PodcastsData;
    isLoading: boolean,
    errorLoading: boolean,
    setData: (data: any) => void;
};

export interface InputProps {
    children: React.ReactElement;
}
