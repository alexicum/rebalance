import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import operators from './fakeData';

// This sets the mock adapter on the default instance
const mock = new MockAdapter(axios, { delayResponse: 1 });

// Mock any GET request to /api/operators
// arguments for reply are (status, data, headers)
mock.onGet('/api/operators').reply(200, operators);
// mock.onGet('/api/operators').networkError();
// mock.onPost('/api/operators').reply(200);
mock.onPost('/api/operators').networkError();

export default axios;
