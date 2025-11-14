
export const AppSettings = {
    TokenKey: "CoronaToken",    
    ApplicationName: "REVOLUTION",
    GetBaseUrl: function () {
        let path = sessionStorage.getItem("CoronaUrl");
        if (path && path.length > 0) {
            return path;
        }
        return "https://mightyware.com:443/revolution";
    },
    GetApplicationName: function () {
        let path = sessionStorage.getItem("CoronaApplicationName");
        if (path && path.length > 0) {
            return path;
        }
        return "REVOLUTION";
    },
}