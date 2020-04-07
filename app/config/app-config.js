import config from "environment";

export const appConfig = {
    apiUrl: window && window._env_ && window._env_.API_URL || config.apiUrl
}