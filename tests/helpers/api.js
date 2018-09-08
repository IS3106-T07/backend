const postSignup = async (testServer, testUser) => {
    return testServer.post('/signup')
        .send(testUser);
};

const postSignin = async (testServer, testUser) => {
    return testServer.post('/signin')
        .send(testUser);
};

module.exports = {
    postSignup,
    postSignin
};