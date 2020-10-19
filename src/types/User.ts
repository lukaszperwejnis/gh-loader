export type User = {
    login: string;
    bio?: string;
    avatarUrl: string;
    repos: Repository[];
};

export type Repository = {
    name: string;
    htmlUrl: string;
};
