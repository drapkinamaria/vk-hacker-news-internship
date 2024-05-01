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
