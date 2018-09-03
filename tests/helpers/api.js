const postUsers = async (testServer, testUser) => {
    return testServer.post('/users')
        .send(testUser);
};

module.exports = {
    postUsers
};