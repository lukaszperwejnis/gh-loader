import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'jest-fetch-mock';
import faker from 'faker';

configure({adapter: new Adapter()});
global.fetch = fetchMock;
fetchMock.enableMocks();
faker.seed(123456);
