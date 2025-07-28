import axios from "axios";
import { stringify } from "query-string";
import { AppSettings } from '../AppSettings'
import { ObjectEdit } from '../AppSettings'
import { ObjectSearch } from '../AppSettings'
import { Login } from '../AppSettings'
import { SendCode } from '../AppSettings'
import { SetPassword } from '../AppSettings'
import { CreateAccount } from '../AppSettings'

let TokenKey = AppSettings.Authorization.LocalStorageTokenKey;

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
            Authorization: sessionStorage.getItem(TokenKey) ? `Bearer ${sessionStorage.getItem(TokenKey)}` : ""
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

const coronaLoginUser = async function (request) {
    const response = await callService(url, request, config);
    return response;
};

const coronaCreateUser = async function (request) {
    const response = await callService(url, request, config);
    return response;
};

const coronaSendUserCode = async function (request) {
    const response = await callService(url, request, config);
    return response;
};

const coronaConfirmUserCode = async function ( request) {
    const response = await callService(url, request, config);
    return response;
};

const coronaGetClasses = async function (request) {
    const response = await callService(url, request, config);
    return response;
};

const coronaGetClass = async function (request) {
    const response = await callService(url, request, config);
    return response;
};

const coronaPutClass = async function (request) {
    const response = await callService(url, request, config);
    return response;
};

const coronaGetObject = async function (request) {
    const response = await callService(url, request, config);
    return response;
};

const coronaCreateObject = async function (request) {
    const response = await callService(url, request, config);
    return response;
};

const coronaPutObject = async function (request) {
    const response = await callService(url, request, config);
    return response;
};

const coronaEditObject = async function (request) {
    const response = await callService(url, request, config);
    return response;
};

const coronaRunObject = async function (request) {
    const response = await callService(url, request, config);
    return response;
};

const coronaQuery = async function (request) {
    const response = await callService(url, request, config);
    return response;
};

