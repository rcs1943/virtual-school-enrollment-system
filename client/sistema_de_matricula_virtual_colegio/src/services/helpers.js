const URL_API = "http://localhost:8080/api_rest_sistema_matricula/api";

//#region Secondary
const getDefaultOptions = (method) => ({
    method, 
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});
const manageAuthorization = (authorizationOptions, headers) => {
    if (authorizationOptions) {
        const { isLogged, token } = authorizationOptions;
        if (!isLogged())
            return [true, null];
        return [false, {
            ...headers,
            "Authorization": `Bearer ${token}`,
        }]
    }
    return [false, headers];
}
const addBodyRequest = (method, body, options) => {
    if (method !== "GET" && body)
        return {
            ...options,
            body: JSON.stringify(body)
        };
    return options;
}
const doFetch = async (endpoint, options) => {
    try {
        const res = await fetch(`${URL_API}${endpoint}`, options);
        const payload = await res.json();
        return [payload, null];
    }
    catch (err) {
        return [null, err];
    }
}
//#endregion
//#region Main
export const doRequest = async (
    endpoint, method, 
    body, 
    authorizationOptions) => {
    let options = getDefaultOptions(method);
    const [mustReturn, optionsWithAuthorization] = manageAuthorization(authorizationOptions, options.headers);
    if (mustReturn)
        return [null, "No token"];
    options.headers = optionsWithAuthorization;
    options = addBodyRequest(method, body, options);
    return await doFetch(endpoint, options);
}
//#endregion