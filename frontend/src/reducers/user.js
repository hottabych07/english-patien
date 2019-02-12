import {AUTH_USER,CHANGE_INFO} from "../actions";

const initialState = {
    auth: false,
    info: {
        id: 1,
        first_name: '',
        last_name: '',
        email: 'unknown@mail.com',
        birthday: null,
        patronymic: "",
        phone: "",
        role: "",
        username: "",
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_USER:
            return Object.assign({}, state,{ auth: action.payload });
        case CHANGE_INFO:
            return Object.assign({}, state, { info: action.payload });
        default:
            return state;
    }
}
