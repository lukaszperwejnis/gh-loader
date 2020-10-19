import faker from 'faker';
import fetch from 'jest-fetch-mock';
import {
    findGitHubUser,
    getUserRepositories,
    getGithubRepositories,
    GitHubRepository,
    sortAndMapRepositories,
    getUserByUsername,
} from '../pages/dashboard/dashboard.service';
import {CONFIG} from '../config';

beforeEach(() => {
    fetch.resetMocks();
});

describe('DashboardService', () => {
    describe('findGitHubUser', () => {
        it('Find GitHub user by username from GitHub API v3', async () => {
            const expectedSuccessResponse = {
                login: faker.internet.userName(),
                bio: faker.lorem.sentence(),
                avatar_url: faker.image.avatar(),
                repos_url: faker.internet.url(),
            };

            fetch.mockResponseOnce(JSON.stringify(expectedSuccessResponse));

            const sampleUsername = expectedSuccessResponse.login;

            const result = await findGitHubUser(sampleUsername);

            expect(window.fetch).toHaveBeenCalledWith(CONFIG.GET_USER_URL + sampleUsername);
            expect(result).toEqual(expectedSuccessResponse);
        });
    });

    describe('getGithubRepositories', () => {
        it('Get repositories from GitHub API v3 by repos_url', async () => {
            const expectedSuccessResponse = generateFakeGithubRepositories(5);

            fetch.mockResponseOnce(JSON.stringify(expectedSuccessResponse));

            const sampleReposUrl = faker.internet.url();
            const result = await getGithubRepositories(sampleReposUrl);

            expect(window.fetch).toHaveBeenCalledWith(sampleReposUrl);
            expect(result).toEqual(expectedSuccessResponse);
        });
    });

    describe('sortAndMapRepositories', () => {
        const repositoriesInput = generateFakeGithubRepositories(5);
        const result = sortAndMapRepositories(repositoriesInput);

        it('Should have length equal 3', () => {
            expect(result.length).toBe(3);
        });

        it('Should be sorted', () => {
            const expectedResult = repositoriesInput.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3);
            for (let i = 0; i > result.length; i++) {
                expect(result[i].name).toBe(expectedResult[i].name);
            }
        });

        it('Should be mapped', () => {
            const isMapped = result.every((el) => {
                return Object.keys(el).length === 2 && el.htmlUrl && el.name;
            });

            expect(isMapped).toBeTruthy();
        });
    });

    describe('getUserRepositories', () => {
        it('Should return three repositories', async () => {
            const expectedSuccessResponse = generateFakeGithubRepositories(5);

            fetch.mockResponseOnce(JSON.stringify(expectedSuccessResponse));

            const sampleReposUrl = faker.internet.url();

            const result = await getUserRepositories(sampleReposUrl);

            expect(window.fetch).toHaveBeenCalledWith(sampleReposUrl);
            expect(result.length).toBe(3);
        });
    });

    describe('getUserByUsername', () => {
        it('Should return GitHub User with his repositories', async () => {
            const expectedSuccessUserResponse = {
                login: faker.internet.userName(),
                bio: faker.lorem.sentence(),
                avatar_url: faker.image.avatar(),
                repos_url: faker.internet.url(),
            };

            const expectedSuccessRepositoriesResponse = generateFakeGithubRepositories(5);

            const expectedResult = {
                login: expectedSuccessUserResponse.login,
                bio: expectedSuccessUserResponse.bio,
                avatarUrl: expectedSuccessUserResponse.avatar_url,
                repos: sortAndMapRepositories(expectedSuccessRepositoriesResponse),
            };

            fetch.once(JSON.stringify(expectedSuccessUserResponse)).once(JSON.stringify(expectedSuccessRepositoriesResponse));

            const result = await getUserByUsername(expectedSuccessUserResponse.login);

            expect(result).toEqual(expectedResult);
        });
    });
});

function generateFakeGithubRepositories(counter: number): GitHubRepository[] {
    const repos = [];

    for (let i = 0; i < counter; i++) {
        repos.push({
            stargazers_count: faker.random.number(),
            name: faker.lorem.word(),
            html_url: faker.internet.url(),
        });
    }

    return repos;
}
