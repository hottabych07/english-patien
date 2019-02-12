import {ADD_COURSES, ADD_COURSE, UPDATE_COURSE, DELETE_COURSE} from "../actions/courses";
import {changeItems, removeItem, replaceStore} from "./index";

const initialState = {
    byId: {},
    allId: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_COURSES:
            return replaceStore(action.payload);
        case ADD_COURSE:
            return changeItems(state, action.payload);
        case UPDATE_COURSE:
            return {
                byId: Object.assign({}, state.byId, {
                    [action.payload.id]: Object.assign(
                        {},
                        state.byId[action.payload.id],
                        action.payload
                    )
                }),
                allId: state.allId
            };
        case DELETE_COURSE:
            return removeItem(Object.assign({}, state), action.payload.id);
        default:
            return state;
    }
}
