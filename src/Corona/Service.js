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

export const callCoronaService = async function (path, request, options) {
    const url = AppSettings.GetBaseUrl() + path;
    const response = await callService(url, request);
    console.log(path, request, response);

    let result = {};

    if (response && response.ok) {
        result = await response.json();
        console.log({ "result": result });
        if (result.success) {
            sessionStorage.setItem(AppSettings.TokenKey, result.data.token);
            result.form = options.successForm;
            result.form_props = {
                success: true,
                message: result.message
            }; // that is the pattern
        }
        else
        {
            result.form = options.redoForm;
            result.form_props = {
                success: false,
                message: response.message || options.redoMessage
            }; // that is the pattern
        }
    }
    else
    {
        result.success = false;
        result.message = options.redoMessage;
        result.form = options.redoForm;
        result.form_props = {}; // that is the pattern
    }

    return result;
}

export const coronaLoginUser = async function (request) {

    let result = callCoronaService("/login/loginuser/", request, {
        successForm: "/Corona/Home",
        redoForm: "/Corona/Login",
        redoMessage: "Could not login"
    });
    return result;
};

export const coronaCreateUser = async function (request) {
    let result = callCoronaService("/login/loginuser/", request, {
        successForm: "/Corona/Home",
        redoForm: "/Corona/Login",
        redoMessage: "Could not create user"
    });
    return result;
};

export const coronaSendUserCode = async function (request) {
    let result = callCoronaService("/login/senduser/", request, {
        successForm: "/Corona/ConfirmCode",
        redoForm: "/Corona/SendCode",
        redoMessage: "Could not send code."
    });
    return result;
};

export const coronaConfirmUserCode = async function ( request) {
    let result = callCoronaService("/login/confirmuser/", request, {
        successForm: "/Corona/Login",
        redoForm: "/Corona/ConfirmCode",
        redoMessage: "Could not confirm code."
    });
    return result;
};

export const coronaSetPassword = async function (request) {
    let result = callCoronaService("/login/passworduser/", request, {
        successForm: "/Corona/Login",
        redoForm: "/Corona/SetPassword",
        redoMessage: "Could not confirm code."
    });
    return result;
};

export const coronaGetClasses = async function (request) {
    let result = callCoronaService("/classes/get/", request, {
        successForm: "/Corona/ClassSearch",
        redoForm: "/Corona/ClassSearch",
        redoMessage: "Could not search classes."
    });
    return result;
};

export const coronaGetClass = async function (request) {
    let result = callCoronaService("/class/get/", request, {
        successForm: "/Corona/ClassEdit",
        redoForm: "/Corona/ClassSearch",
        redoMessage: "Could not search classes."
    });
    return result;
};

export const coronaPutClass = async function (request) {
    let result = callCoronaService("/classes/put/", request, {
        successForm: "/Corona/ClassEdit",
        redoForm: "/Corona/ClassSearch",
        redoMessage: "Could not search classes."
    });
    return result;
};

export const coronaGetObject = async function (request) {
    let result = callCoronaService("/objects/get/", request, {
        successForm: "/Corona/ObjectEdit",
        redoForm: "/Corona/ObjectSearch",
        redoMessage: "Could not get object."
    });
    return result;
};

export const coronaCreateObject = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/create/";
    const response = await callService(url, request);
    let result = callCoronaService("/objects/get/", request, {
        successForm: "/Corona/ObjectEdit",
        redoForm: "/Corona/ObjectSearch",
        redoMessage: "Could not get object."
    });
    return result;
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
