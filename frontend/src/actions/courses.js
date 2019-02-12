
export const ADD_COURSE = '@app/courses/add',
    ADD_COURSES = '@app/courses/adds',
    UPDATE_COURSE = '@app/courses/update',
    DELETE_COURSE = '@app/courses/delete'
;
/*
 * action creators
 */

export function addCourses(payload = {}) {
    return {
        type: ADD_COURSES,
        payload
    };
}

export function addCourse(payload = {}) {
    return {
        type: ADD_COURSE,
        payload
    };
}

export function updateCourse(payload = {}) {
    return {
        type: UPDATE_COURSE,
        payload
    };
}

export function deleteCourse(payload = {}) {
    return {
        type: DELETE_COURSE,
        payload
    };
}