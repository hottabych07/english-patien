
export const ADD_LEARNER = '@app/learners/add',
    ADD_LEARNERS = '@app/learners/adds',
    UPDATE_LEARNER = '@app/learners/update',
    DELETE_LEARNER = '@app/learners/delete'
;
/*
 * action creators
 */

export function addLearners(payload = {}) {
    return {
        type: ADD_LEARNERS,
        payload
    };
}

export function addLearner(payload = []) {
    return {
        type: ADD_LEARNER,
        payload
    };
}

export function updateLearner(payload = {}) {
    return {
        type: UPDATE_LEARNER,
        payload
    };
}

export function deleteLearner(payload = {}) {
    return {
        type: DELETE_LEARNER,
        payload
    };
}