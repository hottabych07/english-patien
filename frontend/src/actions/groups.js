
export const ADD_GROUP = '@app/groups/add',
    ADD_GROUPS = '@app/groups/adds',
    UPDATE_GROUP = '@app/groups/update',
    DELETE_GROUP = '@app/groups/delete'
;
/*
 * action creators
 */

export function addGroups(payload = []) {
    return {
        type: ADD_GROUPS,
        payload
    };
}

export function addGroup(payload = {}) {
    return {
        type: ADD_GROUP,
        payload
    };
}


export function updateGroup(payload = {}) {
    return {
        type: UPDATE_GROUP,
        payload
    };
}

export function deleteGroup(payload = {}) {
    return {
        type: DELETE_GROUP,
        payload
    };
}