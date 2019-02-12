import {ADD_LEARNERS, ADD_LEARNER, UPDATE_LEARNER, DELETE_LEARNER} from "../actions/learners";
import {changeItems, removeItem, replaceStore} from "./index";

const initialState = {
    byId: {},
    allId: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_LEARNERS:
            return replaceStore(action.payload);
        case ADD_LEARNER:
            return changeItems(state, action.payload);
        case UPDATE_LEARNER:
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
        case DELETE_LEARNER:
            return removeItem(Object.assign({}, state), action.payload.id);
        default:
            return state;
    }
}
