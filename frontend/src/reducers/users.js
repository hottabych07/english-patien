import {ADD_USERS, ADD_USER, UPDATE_USER, DELETE_USER} from "../actions/users";
import {changeItems, removeItem, replaceStore} from "./index";

const initialState = {
    byId: {},
    allId: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_USERS:
            return replaceStore(action.payload);
        case ADD_USER:
            return changeItems(state, action.payload);
        case UPDATE_USER:
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
        case DELETE_USER:
            return removeItem(Object.assign({}, state), action.payload.id);
        default:
            return state;
    }
}
