import React from 'react';

export function filterByRole(state, role) {
    let {users} = state.entities;
    let byId = {};
    let allId = [];
    users.allId.map((id) => {
        if (users.byId[id]) {
            if (users.byId[id].role === role) {
                byId[id] = Object.assign({}, users.byId[id]);
                allId.push(id)
            }
        }
    });

    return {
        byId,
        allId,
    }
}

export function filterManagers(state, flag = false) {
    let managers = filterByRole(state, 'manager');
    if (flag) {
        return managers.byId
    }
    console.log('managers filter:', managers.allId.map((id) => managers.byId[id]));
    return managers.allId.map((id) => Object.assign({key: id},managers.byId[id]))
}

export function filterTeachers(state, flag = false) {
    let teachers = filterByRole(state, 'teacher');
    if (flag) {
        return teachers.byId
    }
    console.log('teachers filter:', teachers.allId.map((id) => teachers.byId[id]));
    return teachers.allId.map((id) => Object.assign({key: id},teachers.byId[id]))
}

export function filterLearners(state, flag = false) {
    let { learners } = state.entities;
    if (flag) {
        return learners.byId
    }
    console.log('managers filter:', learners.allId.map((id) => learners.byId[id]));
    return learners.allId.map((id) => Object.assign({key: id}, learners.byId[id]))
}

export function filterTeachersResourses(state) {
    let teachers = filterByRole(state, 'teacher');
    return teachers.allId.map((key) => {
        let {id, name} = teachers.byId[key];
        return {id: id.toString(), name}
    })
}

export function filterGroups(state, flag = false) {
    let {groups} = state.entities;
    if (flag) {
        return groups.byId
    }
    console.log('groups filter:', groups.allId.map((id) => groups.byId[id]));
    return groups.allId.map((id) => Object.assign({key: id}, groups.byId[id]))
}

export function filterGroupsResourses(state) {
    let {groups} = state.entities;
    return groups.allId.map((key) => {
        let {id, name} = groups.byId[key];
        return {id: id.toString(), name}
    })
}


export function filterCourses(state, flag = false) {
    let {courses} = state.entities;
    if (flag) {
        return courses.byId
    }
    console.log('courses filter:', courses.allId.map((id) => courses.byId[id]));
    return courses.allId.map((id) => Object.assign({key: id},courses.byId[id]))
}

export function filterLessons(state) {
    let {lessons} = state.entities;
    console.log('lessons filter:', lessons.allId.map((id) => lessons.byId[id]));
    return lessons.allId.map((id) => lessons.byId[id])
}

export function filterLessonsEvents(state, flag) {
    let {lessons, courses} = state.entities;
    if (flag) {
        let newLessons = [];
        lessons.allId.forEach((key) => {
            let {
                id,
                course,
                groups, // []
                teacher,
                date_from, // '2018-12-29'
                date_to,
                time_from, //'10:35:00'
                time_to, //'12:25:00'
                type, // 4,
                location,//'306 ауд.',
                bgColor, // "#d90008"
                title = '',
                name = ''
            } = lessons.byId[key];

            groups.forEach((groupId) => {
                newLessons.push({
                    id: id.toString() + '_' + groupId.toString(),
                    title: name ? name : (courses.byId[course] ? courses.byId[course].title : (title ? title : "Занятие №" + id.toString())),
                    resourceId: groupId.toString(),
                    teacher,
                    start: date_from + ' ' + time_from,
                    end: date_to + ' ' + time_to,
                    bgColor,
                    groups,
                    type,
                    location,
                    course
                })
            })
        });
        return newLessons;
    } else {
        return lessons.allId.map((key) => {
            let {
                id,
                course,
                name,
                groups, // []
                teacher,
                date_from, // '2018-12-29'
                date_to, // '2018-12-29'
                time_from, //'10:35:00'
                time_to, //'12:25:00'
                type, // 4,
                location,//'306 ауд.',
                bgColor, // "#d90008"
                title = '',
            } = lessons.byId[key];

            return {
                id: id.toString(),
                title: name ? name : (courses.byId[course] ? courses.byId[course].title : (title ? title : "Занятие №" + id.toString())),
                resourceId: teacher.toString(),
                start: date_from + ' ' + time_from,
                end: date_to + ' ' + time_to,
                bgColor,
                teachers: courses.byId[course] ? courses.byId[course].teachers : [],
                groups,
                type,
                location,
                course
            }
        })
    }
}

export function filterPayments(state, flag = false) {
    let {payments, learners} = state.entities;
    if (flag) {
        return payments.byId
    }
    console.log('payments filter:', payments.allId.map((id) => payments.byId[id]));
    return payments.allId.map((id) => Object.assign({key: id, learnerObj: learners.byId[payments.byId[id].learner]}, payments.byId[id]))
}
