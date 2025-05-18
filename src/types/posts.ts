export type TAuthor = {
    id: number;
    name: string;
    image: string;
};

export interface TPost {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: number;
    author?: TAuthor;
    isNew?: boolean;
};
