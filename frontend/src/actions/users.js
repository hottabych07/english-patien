
export const ADD_USER = '@app/users/add',
    ADD_USERS = '@app/users/adds',
    UPDATE_USER = '@app/users/update',
    DELETE_USER = '@app/users/delete'
;
/*
 * action creators
 */

export function addUsers(payload = {}) {
    return {
        type: ADD_USERS,
        payload
    };
}

export function addUser(payload = []) {
    return {
        type: ADD_USER,
        payload
    };
}

export function updateUser(payload = {}) {
    return {
        type: UPDATE_USER,
        payload
    };
}

export function deleteUser(payload = {}) {
    return {
        type: DELETE_USER,
        payload
    };
}