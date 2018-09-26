import requester from './requester';

const getOperators = async () => {
  const result = await requester.get('/api/operators');
  return result.data;
};

const addOperator = async ({ name }) => {
  const result = await requester.post('/api/operators', { name });
  return result.data;
};

export { getOperators, addOperator };
