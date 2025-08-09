import { AppSettings } from './AppSettings'

const callService = async function (url, request) {
    let response = {};
    try
    {
        let these_headers = {
            'Content-Type': 'application/json'
        }
        let token = sessionStorage.getItem(AppSettings.TokenKey);
        if (token) {
            these_headers['Authorization'] = "Bearer " + token;
        }
        response = await fetch(url, {
            method: 'POST',
            headers: these_headers,
            body: JSON.stringify(request), // Send JSON data
            signal: AbortSignal.timeout(5000) // 5 seconds timeout
        });
    }
    catch (error)
    {
        response.success = false;
        response.message = "Error calling service: " + error;
    }
    return response;
}

export const coronaLoginUser = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/login/loginuser/";
    const response = await callService(url, request);
    console.log("Login response", response);

    let result = {};

    if (response && response.status == 200)
    {
        let result = response.body();
        console.log({ "Login result": result });
        result.success = result.success;
        result.message = result.message;
        if (result.success) {
            sessionStorage.setItem(AppSettings.TokenKey, response.data.token);
            result.form = "/Corona/Home";
            result.form_props = {
                success: true,
                message: response.message
            }; // that is the pattern
        }
        else
        {
            result.form = "/Corona/Login";
            result.form_props = {
                success: false,
                message: response.data.message || "Could not login"
            }; // that is the pattern
        }
    }
    else
    {
        result.success = false;
        result.message = "Could not login";
        result.form = "/Corona/Login";
        result.form_props = {}; // that is the pattern
    }

    return result;
};

export const coronaCreateUser = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/login/createuser/";
    const response = await callService(url, request);
    return response;
};

export const coronaSendUserCode = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/login/senduser/";
    const response = await callService(url, request);
    return response;
};

export const coronaConfirmUserCode = async function ( request) {
    const url = AppSettings.GetBaseUrl() + "/login/confirmuser/";
    const response = await callService(url, request);
    return response;
};

export const coronaSetPassword = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/login/passworduser/";
    const response = await callService(url, request);
    return response;
};

export const coronaGetClasses = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/classes/get/";
    const response = await callService(url, request);
    return response;
};

export const coronaGetClass = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/classes/get/details/";
    const response = await callService(url, request);
    return response;
};

export const coronaPutClass = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/classes/put/";
    const response = await callService(url, request);
    return response;
};

export const coronaGetObject = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/get/";
    const response = await callService(url, request);
    return response;
};

export const coronaCreateObject = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/create/";
    const response = await callService(url, request);
    return response;
};

export const coronaPutObject = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/put/";
    const response = await callService(url, request);
    return response;
};

export const coronaEditObject = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/edit/";
    const response = await callService(url, request);
    return response;
};

export const coronaRunObject = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/run/";
    const response = await callService(url, request);
    return response;
};

export const coronaQuery = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/query/";
    const response = await callService(url, request);
    return response;
};
