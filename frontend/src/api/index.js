import axios from 'axios'
import moment from 'moment'
import {message} from 'antd'

import {config} from '../utils/config'
import {getCookie} from '../utils/cookies';

export const API_URL = config.get('url', {mode: process.env.NODE_ENV}) + '/api';

function fetchData(config) {
    const token = getCookie('jwtToken');

    config.url = API_URL + config.url;
    config.headers = {
        'Content-Type': 'application/json'
    };
    if (token) {
        config.headers.Authorization =
            `JWT ${token}`;
    }
    return axios(config)
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response);
                if (error.response.status >= 500) {
                    message.error(error.response.data);
                }
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }

            return {
                data: error.response.data
            }
        })
}

export function fetchAuth({email, password = ''}) {
    const config = {
        url: '/token/obtain/',
        method: 'post',
        data: {
            email,
            password
        }
    };

    return fetchData(config)//.then(() => ({ data: { token: 'test'}}));
}

export function fetchVerifyToken() {
    let token = getCookie('jwtToken') || '';
    const config = {
        url: '/token/verify/',
        method: 'post',
        data: {
            token
        }
    };

    return fetchData(config)//.then(() => ({ data: { token: 'test'}}));
}

export function fetchRefreshToken() {
    let token = getCookie('jwtToken') || '';
    const config = {
        url: '/token/refresh/',
        method: 'post',
        data: {
            token
        }
    };

    return fetchData(config)//.then(() => ({ data: { token: 'test'}}));
}


export function fetchUser() {
    const config = {
        url: '/auth/user/',
        method: 'get',
    };

    return fetchData(config)//.then(() => ({ data: { token: 'test'}}));
}

export function fetchChangeUserInfo(data) {
    const config = {
        url: '/auth/user/',
        method: 'put',
        data
    };

    return fetchData(config)//.then(() => ({ data: { token: 'test'}}));
}

export function fetchPwd(data) {
    const config = {
        url: '/auth/password/change/',
        method: 'post',
        data
    };

    return fetchData(config)
}


export function fetchUsers() {
    const config = {
        url: '/users/',
        method: 'get',
    };

    return fetchData(config).then(({data}) => {
        let {results} = data;
        let users = [];
        results.forEach((item, i) => {
            let {
                first_name,
                last_name,
                username,
                patronymic,
                id,
                phone = '',
                email,
                is_active,
                role,
                birthday = ''
            } = item;
            users.push({
                id,
                name: (first_name && last_name) ? (first_name + ' ' + last_name) : username,
                email,
                phone,
                first_name,
                patronymic,
                last_name,
                is_active,
                birthday,
                username,
                role
            });

        });

        return {data: users}
    });
}

export function fetchAddUser(item) {
    const config = {
        url: '/users/',
        method: 'post',
        data: item
    };

    return fetchData(config).then(({data}) => {
        let {
            first_name,
            last_name,
            username,
            id,
            patronymic = '',
            phone = '',
            email,
            is_active,
            role,
            birthday = ''
        } = data;
        return {
            data: [{
                id,
                name: (first_name && last_name) ? (first_name + ' ' + last_name) : username,
                email,
                phone,
                patronymic,
                first_name,
                last_name,
                birthday,
                is_active,
                username,
                role
            }]
        }
    });
}

export function fetchUpdateUser(item) {
    const config = {
        url: '/users/' + item.id + '/',
        method: 'put',
        data: item
    };

    return fetchData(config).then(({data}) => {
        let {
            first_name,
            last_name,
            username,
            patronymic = '',
            id,
            phone = '',
            email,
            role,
            is_active,
            birthday = ''
        } = data;
        return {
                id,
                name: (first_name && last_name) ? (first_name + ' ' + last_name) : username,
                email,
                phone,
                patronymic,
                first_name,
                last_name,
                is_active,
                birthday,
                username,
                role
            }
    });
}


export function fetchDeleteUser(id) {
    const config = {
        url: '/users/' + id + '/',
        method: 'delete',
    };

    return fetchData(config).then(({status}) => status);
}

export function fetchLearners() {
    const config = {
        url: '/learners/',
        method: 'get',
    };

    return fetchData(config).then(({data}) => {
        let {results} = data;
        let users = [];
        results.forEach((item, i) => {
            let {
                first_name,
                last_name,
                patronymic = '',
                username = '',
                id,
                phone = '',
                email,
                role,
                birthday = ''
            } = item;
            users.push({
                id,
                name: (first_name && last_name) ? (first_name + ' ' + last_name) : username,
                email,
                phone,
                patronymic,
                first_name,
                last_name,
                birthday,
                username,
                role
            });

        });

        return {data: users}
    });
}

export function fetchAddLearner(item) {
    const config = {
        url: '/learners/',
        method: 'post',
        data: item
    };

    return fetchData(config).then(({data}) => {
        let {
            first_name,
            last_name,
            username,
            id,
            phone = '',
            email,
            patronymic = '',
            role,
            birthday = ''
        } = data;
        return {
            data: [{
                id,
                name: (first_name && last_name) ? (first_name + ' ' + last_name) : username,
                email,
                phone,
                first_name,
                last_name,
                patronymic,
                birthday,
                username,
                role
            }]
        }
    });
}

export function fetchUpdateLearner(item) {
    const config = {
        url: '/learners/' + item.id + '/',
        method: 'put',
        data: item
    };

    return fetchData(config).then(({data}) => {
        let {
            first_name,
            last_name,
            username,
            id,
            phone = '',
            patronymic = '',
            email,
            role,
            birthday = ''
        } = data;
        return {
            id,
            name: (first_name && last_name) ? (first_name + ' ' + last_name) : username,
            email,
            phone,
            patronymic,
            first_name,
            last_name,
            birthday,
            username,
            role
        }
    });
}

export function fetchDeleteLearner(id) {
    const config = {
        url: '/learners/' + id + '/',
        method: 'delete',
    };

    return fetchData(config).then(({status}) => status);
}

export function fetchGroupsByLearner(id) {
    const config = {
        url: '/groups/?learners=' + id,
        method: 'get'
    };

    return fetchData(config).then(({data: {results}}) => {
        console.log('COURSES::', results);
        let handledData = [];
        results.forEach((item, i) => {
            let {
                id,
            } = item;

            handledData.push(id)
        });

        return handledData
    });
}

export function fetchGroups() {
    const config = {
        url: '/groups/',
        method: 'get'
    };

    return fetchData(config).then(({data: {results}}) => {
        console.log('COURSES::', results);
        let handledData = [];
        results.forEach((item, i) => {
            let {
                id,
                name,
                learners = []
            } = item;

            handledData.push({
                id,
                name,
                learners
            })
        });

        return {data: handledData}
    });
}


export function fetchAddGroup(item) {
    const config = {
        url: '/groups/',
        method: 'post',
        data: item
    };

    return fetchData(config).then(({data}) => {
        let {
            id,
            name,
            learners = []
        } = data;
        return {
            data: [{
                id,
                name,
                learners
            }]
        }
    });
}

export function fetchUpdateGroup(item) {
    const config = {
        url: '/groups/' + item.id + '/',
        method: 'put',
        data: item
    };

    return fetchData(config).then(({data}) => {
        let {
            id,
            name,
            learners = []
        } = data;
        return {
            id,
            name,
            learners
        }
    });
}

export function fetchDeleteGroup(id) {
    const config = {
        url: '/groups/' + id + '/',
        method: 'delete',
    };

    return fetchData(config).then(({status}) => status);
}

export function fetchCourses() {
    const config = {
        url: '/courses/',
        method: 'get'
    };

    return fetchData(config).then(({data: {results}}) => {
        console.log('COURSES::', results);
        let handledData = [];
        results.forEach((item, i) => {
            let {
                description,
                end_date,
                id,
                name,
                start_date,
                teachers,
                groups
            } = item;

            handledData.push({
                id,
                title: name,
                description,
                date_from: start_date,
                date_to: end_date,
                teachers,
                groups
            })
        });

        return {data: handledData}
    });
}


export function fetchAddCourse(item) {
    const config = {
        url: '/courses/',
        method: 'post',
        data: item
    };

    return fetchData(config).then(({data}) => {
        let {
            created_at,
            description,
            end_date,
            id,
            name,
            groups,
            start_date,
            teachers,
        } = data;
        return {
            data: [{
                description,
                id,
                title: name,
                date_from: start_date,
                date_to: end_date,
                teachers,
                groups,
            }]
        }
    });
}

export function fetchUpdateCourse(item) {
    const config = {
        url: '/courses/' + item.id + '/',
        method: 'put',
        data: item
    };

    return fetchData(config).then(({data}) => {
        let {
            created_at,
            description,
            end_date,
            id,
            name,
            groups,
            start_date,
            teachers,
        } = data;
        return {
            description,
            id,
            title: name,
            date_from: start_date,
            date_to: end_date,
            teachers,
            groups,

        }
    });
}

export function fetchDeleteCourse(id) {
    const config = {
        url: '/courses/' + id + '/',
        method: 'delete',
    };

    return fetchData(config).then(({status}) => status);
}


export function fetchLessons() {
    const config = {
        url: '/lessons/',
        method: 'get'
    };

    return fetchData(config).then(({data}) => {
        let lessons = [];
        console.log('LESSONS: ', data);
        data.results.forEach(({
                                  name,
                                  created_at,
                                  lesson_type,
                                  end_time,
                                  id,
                                  start_time,
                                  groups,
                                  teacher,
                                  course,
                                  bg_color,
                                  location
                              }) => {
            lessons.push({
                id,
                name: name ? name : '',
                course: course ? course : '',
                groups,
                teacher,
                date_from: moment(start_time).format('YYYY-MM-DD'),
                date_to: moment(end_time).format('YYYY-MM-DD'),
                time_from: moment(start_time).format('HH:mm:ss'),
                time_to: moment(end_time).format('HH:mm:ss'),
                type: lesson_type,
                location,
                bgColor: bg_color
            })
        });
        console.log('FORMATTED LESSONS: ', lessons);
        return {data: lessons}
    });
}

export function fetchAddLesson(items) {
    const config = {
        url: '/lessons/bulk_create/',
        method: 'post',
        data: items
    };

    return fetchData(config).then(({data}) => {
        console.log('ADDED LESSONS', data);
    });
}

export function fetchAddLessons(items) {
    const config = {
        url: '/lessons/bulk_create/',
        method: 'post',
        data: items
    };

    return fetchData(config).then(({status}) => status);
}


export function fetchUpdateLesson(item, id) {
    const config = {
        url: '/lessons/' + id + '/',
        method: 'put',
        data: item
    };

    return fetchData(config).then(({data}) => {
        console.log('EDIT RESP:', data);
        let {
            name,
            created_at,
            lesson_type,
            end_time,
            id,
            start_time,
            groups,
            teacher,
            course,
            bg_color,
            location
        } = data;
        return {
            id,
            name: name ? name : '',
            course: course ? course : '',
            groups,
            teacher,
            date_from: moment(start_time).format('YYYY-MM-DD'),
            date_to: moment(end_time).format('YYYY-MM-DD'),
            time_from: moment(start_time).format('HH:mm:ss'),
            time_to: moment(end_time).format('HH:mm:ss'),
            type: lesson_type,
            location,
            bgColor: bg_color
        }
    });
}

export function fetchDeleteLesson(id) {
    const config = {
        url: '/lessons/' + id + '/',
        method: 'delete',
    };

    return fetchData(config).then(({status}) => status);
}


export function fetchPayments() {
    const config = {
        url: '/payments/',
        method: 'get',
    };

    return fetchData(config).then(({data}) => {
        let {results} = data;
        let payments = [];
        results.forEach((item, i) => {
            let {
                id,
                learner = '',
                comment= "",
                status= "",
                payment_date = '',
                amount = ''
            } = item;
            payments.push({
                id,
                learner,
                comment,
                status,
                payment_date,
                amount
            });

        });

        return {data: payments}
    });
}

export function fetchAddPayment(item) {
    const config = {
        url: '/payments/',
        method: 'post',
        data: item
    };

    return fetchData(config).then(({data}) => {
        let {
            id,
            learner = '',
            comment= "",
            status= "",
            payment_date = '',
            amount = ''
        } = data;
        return {
            data: [{
                id,
                learner,
                comment,
                status,
                payment_date,
                amount
            }]
        }
    });
}

export function fetchUpdatePayment(item) {
    const config = {
        url: '/payments/' + item.id + '/',
        method: 'put',
        data: item
    };

    return fetchData(config).then(({data}) => {
        let {
            id,
            learner = '',
            comment= "",
            status= "",
            payment_date = '',
            amount = ''
        } = data;
        return {
            id,
            learner,
            comment,
            status,
            payment_date,
            amount
        }
    });
}


export function fetchDeletePayment(id) {
    const config = {
        url: '/payments/' + id + '/',
        method: 'delete',
    };

    return fetchData(config).then(({status}) => status);
}

