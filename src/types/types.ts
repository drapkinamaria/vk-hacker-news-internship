export type NewsItem = {
    id: number;
    by: string;
    descendants: number;
    score: number;
    time: number;
    title: string;
    type: string;
    url: string;
    kids: number[]
}

export type NewsState = {
    ids: number[];
    news: NewsItem[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export type CommentItem = {
    by?: string,
    id: number,
    kids?: number[],
    parent : number,
    text? : string,
    time: string,
    type : string
    deleted?: boolean,
    descendants?: number
}
