import {ADD_GROUPS, ADD_GROUP, UPDATE_GROUP, DELETE_GROUP} from "../actions/groups";
import {changeItems, removeItem, replaceStore} from "./index";

const initialState = {
    byId: {},
    allId: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_GROUPS:
            return replaceStore(action.payload);
        case ADD_GROUP:
            return changeItems(state, action.payload);
        case UPDATE_GROUP:
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
        case DELETE_GROUP:
            return removeItem(Object.assign({}, state), action.payload.id);
        default:
            return state;
    }
}
