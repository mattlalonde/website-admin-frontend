const inMemoryJWTManager = () => {
    let jwtToken: string | null = null;

    const getToken = () => jwtToken;

    const setToken = (token: string) => {
        jwtToken = token;
        return true;
    };

    const removeToken = () => {
        jwtToken = null;
        return true;
    }

    return {
        removeToken,
        getToken,
        setToken,
    }
};

export default inMemoryJWTManager();