const { graphql, buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
        hello2: String
    }
`);

const root = {
    hello: () => {
        return 'Hello world!';
    },
    hello2: () => {
        return 'Hello universe!';
    },
};

const gql = (query, callback) => {
    graphql(schema, query, root).then((response) => { 
        callback(response.data);
    });
};

export default gql;