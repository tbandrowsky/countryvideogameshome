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
        response.ok = false;
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
            if (options && options.storeToken && result.token) {
                sessionStorage.setItem(AppSettings.TokenKey, result.token);
            }
            result.form = options.successForm;
            console.log({ "final result": result });
        }
        else
        {
            console.log({"response good, result bad": response, "fallbackprops": options.formProps});
            result.form = options.redoForm;
        }
    }
    else
    {
        console.log({"response bad": response, "fallbackprops": options.formProps});
        result.success = false;
        result.message = options.redoMessage;
        result.form = options.redoForm;
    }

    return result;
}

export const coronaLoginUser = async function (request, uxo) {
    if (!uxo) uxo = { };
    uxo = { ...uxo, storeToken: true };

    let result = callCoronaService("/login/loginuser/", request, {
        successForm: "/Revolution/Home",
        redoForm: "/Revolution/Login",
        redoMessage: "Could not login",
        ...uxo
    });
    return result;
};

export const coronaLoginUserSso = async function (request, uxo) {
    if (!uxo) uxo = { };
    uxo = { ...uxo, storeToken: true };

    let result = callCoronaService("/login/loginusersso/", request, {
        successForm: "/Revolution/Home",
        redoForm: "/Revolution/Login",
        redoMessage: "Could not login",
        ...uxo
    });
    return result;
};

export const coronaCreateUser = async function (request, uxo) {

    if (!uxo) uxo = {};

    let result = callCoronaService("/login/createuser/", request, {
        successForm: "/Revolution/Home",
        redoForm: "/Revolution/Login",
        redoMessage: "Could not create user",
        ...uxo
    });
    return result;
};

export const coronaSendUserCode = async function (request, uxo) {

    if (!uxo) uxo = {};

    let result = callCoronaService("/login/senduser/", request, {
        successForm: "/Revolution/ConfirmCode",
        redoForm: "/Revolution/SendCode",
        redoMessage: "Could not send code.",
        ...uxo
    });
    return result;
};

export const coronaConfirmUserCode = async function (request, uxo) {
    if (!uxo) uxo = {};
    uxo = { ...uxo, storeToken: true };
    let result = callCoronaService("/login/confirmuser/", request, {
        successForm: "/Revolution/Home",
        redoForm: "/Revolution/ConfirmCode",
        redoMessage: "Could not confirm code.",
        ...uxo
    });
    return result;
};

export const coronaSetPassword = async function (request, uxo) {
    if (!uxo) uxo = {};
    let result = callCoronaService("/login/passworduser/", request, {
        successForm: "/Revolution/Login",
        redoForm: "/Revolution/SetPassword",
        redoMessage: "Could not confirm code.",
        ...uxo
    });
    return result;
};

export const coronaGetClasses = async function (request, uxo) {
    if (!uxo) uxo = {};
    let result = callCoronaService("/classes/get/", request, {
        successForm: "/Revolution/ClassSearch",
        redoForm: "/Revolution/ClassSearch",
        redoMessage: "Could not search classes.",
        ...uxo
    });
    return result;
};

export const coronaGetClass = async function (request, uxo) {
    if (!uxo) uxo = {};
    let result = callCoronaService("/classes/get/details", request, {
        successForm: "/Revolution/ClassEdit",
        redoForm: "/Revolution/ClassSearch",
        redoMessage: "Could not search classes.",
        ...uxo
    });
    return result;
};

export const coronaPutClass = async function (request, uxo) {
    if (!uxo) uxo = {};
    let result = callCoronaService("/classes/put/", request, {
        successForm: "/Revolution/ClassEdit",
        redoForm: "/Revolution/ClassSearch",
        redoMessage: "Could not search classes.",
        ...uxo
    });
    return result;
};

export const coronaGetObject = async function (request, uxo) {
    if (!uxo) uxo = {};
    let result = callCoronaService("/objects/get/", request, {
        successForm: "/Revolution/ObjectEdit",
        redoForm: "/Revolution/ObjectSearch",
        redoMessage: "Could not get object.",
        ...uxo
    });
    return result;
};

export const coronaSetTeam = async function (request, uxo) {
    if (!uxo) uxo = {};
    let result = callCoronaService("/user/set_team/", request, {
        successForm: "/Revolution/Home",
        redoForm: "/Revolution/Home",
        redoMessage: "Could not get object.",
        ...uxo
    });
    return result;
};


export const coronaCreateObject = async function (request, uxo) {
    if (!uxo) uxo = {};
    let result = callCoronaService("/objects/get/", request, {
        successForm: "/Revolution/ObjectEdit",
        redoForm: "/Revolution/ObjectSearch",
        redoMessage: "Could not get object.",
        ...uxo
    });
    return result;
};

export const coronaPutObject = async function (request, uxo) {
    if (!uxo) uxo = {};
    let result = callCoronaService("/objects/put/", request, {
        successForm: "/Revolution/ObjectEdit",
        redoForm: "/Revolution/ObjectEdit",
        redoMessage: "Could not save object.",
        ...uxo
    });
    return result;
};

export const coronaEditObject = async function (request, uxo) {
    if (!uxo) uxo = {};
    let result = callCoronaService("/objects/edit/", request, {
        successForm: "/Revolution/ObjectEdit",
        redoForm: "/Revolution/ObjectEdit",
        redoMessage: "Could not save object.",
        ...uxo
    });
    return result;
};

export const coronaRunObject = async function (request, uxo) {
    if (!uxo) uxo = {};
    let result = callCoronaService("/objects/run/", request, {
        successForm: "/Revolution/ObjectEdit",
        redoForm: "/Revolution/ObjectEdit",
        redoMessage: "Could not save object.",
        ...uxo
    });
    return result;
};

export const coronaQuery = async function (request, uxo) {
    if (!uxo) uxo = {};
    let result = callCoronaService("/objects/query/", request, {
        successForm: "/Revolution/ObjectSearch",
        redoForm: "/Revolution/ObjectSearch",
        redoMessage: "Could not query class.",
        ...uxo
    });
    return result;
};
