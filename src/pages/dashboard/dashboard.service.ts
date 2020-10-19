import {Repository, User} from '../../types/User';
import {CONFIG} from '../../config';

export type GitHubUser = {
    login: string;
    bio: string;
    avatar_url: string;
    repos_url: string;
};

export const getUserByUsername = async (username: string): Promise<User> => {
    const filters = username ? `/${username}` : '/';
    const {repos_url, avatar_url, ...otherDetails} = await findGitHubUser(filters);
    const repos = await getUserRepositories(repos_url);
    return {
        ...otherDetails,
        avatarUrl: avatar_url,
        repos,
    };
};

export const findGitHubUser = (username: string): Promise<GitHubUser> => {
    return fetch(CONFIG.GET_USER_URL + username)
        .then((res) => res.json())
        .then(async ({login, avatar_url, repos_url, bio}: GitHubUser) => {
            return {
                login,
                bio,
                avatar_url,
                repos_url,
            };
        });
};

export type GitHubRepository = {
    stargazers_count: number;
    name: string;
    html_url: string;
};

export const getUserRepositories = async (reposUrl: string): Promise<Repository[]> => {
    const gitHubRepositories = await getGithubRepositories(reposUrl);
    return sortAndMapRepositories(gitHubRepositories);
};

export const getGithubRepositories = (reposUrl: string): Promise<GitHubRepository[]> => {
    return fetch(reposUrl)
        .then((res) => res.json())
        .then((repos: GitHubRepository[]) => repos);
};

export const sortAndMapRepositories = (repos: GitHubRepository[]): Repository[] => {
    const mappedRepos: Repository[] = repos
        .sort((a: GitHubRepository, b: GitHubRepository) => b.stargazers_count - a.stargazers_count)
        .map(({name, html_url}) => ({
            name,
            htmlUrl: html_url,
        }));

    return mappedRepos.length >= 3 ? mappedRepos.slice(0, 3) : mappedRepos;
};
