
export const AUTH_USER = '@app/user/auth';
export const CHANGE_INFO = '@app/user/change';
/*
 * action creators
 */

export function authUser(payload = false) {
    return {
        type: AUTH_USER,
        payload
    };
}

export function setInfo(payload = {}) {
    return {
        type: CHANGE_INFO,
        payload
    };
}
