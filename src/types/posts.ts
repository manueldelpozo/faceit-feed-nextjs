export interface TPost {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: number;
    author?: {
        id: number;
        name: string;
        image: string;
    };
    isNew?: boolean;
};
