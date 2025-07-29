import axios from "axios";
import { stringify } from "query-string";
import { AppSettings } from '../AppSettings'

const callService = function (url, request, config) {
    if (!config) {
        config = {};
    }
    let defaultConfig = {
        method: config.method || "get",
        url: url,
        baseURL: AppSettings.GetBaseUrl(),
        headers: {
            "Content-Type": config.headers && config.headers["Content-Type"] ? config.headers["Content-Type"] : "application/json",
            Authorization: sessionStorage.getItem(AppSettings.TokenKey) ? `Bearer ${sessionStorage.getItem(AppSettings.TokenKey)}` : ""
        },
        timeout: config.timeout || 60000,
        responseType: config.responseType || "json",
        responseEncoding: config.responseEncoding || "utf8",
        maxContentLength: config.maxContentLength || 4000,
        paramsSerializer: function (params) {
            return stringify(params, { arrayFormat: "index" });
        }
    };
    if (defaultConfig.method === "get") {
        defaultConfig.params = request;
    } else {
        defaultConfig.data = request;
    }
    const client = axios.create(defaultConfig);
    return new Promise(resolve => {
        client
            .request(defaultConfig)
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                let messageText = config.errorMessageText || "Unable to complete request";
                let messageTitle = config.errorMessageTitle || "Error";

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    if (error.response.status == 401) {
                        messageText = "You are not logged in";
                        messageTitle = "Unauthorized";
                    } else if (error.response.status == 403) {
                        messageText = "Access Denied";
                        messageTitle = "Forbidden";
                    }
                }
                resolve();
            });
    });
};

export const coronaLoginUser = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/login/loginuser/";
    const config = {};
    const response = await callService(url, request, config);

    let result = {};

    if (response && response.data)
    {
        result.success = response.data.success;
        result.message = response.data.message;
        if (result.success) {
            sessionStorage.setItem(AppSettings.TokenKey, response.data.token);
            result.form = "home";
            result.form_props = {}; // that is the pattern
        }
        else
        {
            result.form = "login";
            result.form_props = {}; // that is the pattern
        }
    }
    else
    {
        result.success = false;
        result.message = "Could not login";
        result.form = "login";
        result.form_props = {}; // that is the pattern
    }

    return response;
};

export const coronaCreateUser = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/login/createuser/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

export const coronaSendUserCode = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/login/senduser/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

export const coronaConfirmUserCode = async function ( request) {
    const url = AppSettings.GetBaseUrl() + "/login/confirmuser/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

export const coronaSetPassword = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/login/passworduser/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

export const coronaGetClasses = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/classes/get/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

export const coronaGetClass = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/classes/get/details/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

export const coronaPutClass = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/classes/put/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

export const coronaGetObject = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/get/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

export const coronaCreateObject = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/create/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

export const coronaPutObject = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/put/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

export const coronaEditObject = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/edit/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

export const coronaRunObject = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/run/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

export const coronaQuery = async function (request) {
    const url = AppSettings.GetBaseUrl() + "/objects/query/";
    const config = {};
    const response = await callService(url, request, config);
    return response;
};

