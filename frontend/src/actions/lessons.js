
export const ADD_LESSON = '@app/lessons/add',
    ADD_LESSONS = '@app/lessons/adds',
    UPDATE_LESSON = '@app/lessons/update',
    DELETE_LESSON = '@app/lessons/delete'
;
/*
 * action creators
 */

export function addLessons(payload = {}) {
    return {
        type: ADD_LESSONS,
        payload
    };
}

export function updateLesson(payload = {}) {
    return {
        type: UPDATE_LESSON,
        payload
    };
}

export function deleteLesson(payload = {}) {
    return {
        type: DELETE_LESSON,
        payload
    };
}