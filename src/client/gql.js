const gql = (query, callback) => {
    const params = { query };
    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    };
    fetch('/graphql', options)
        .then((res) => res.json())
        .then((json) => callback(json));
};

export default gql;