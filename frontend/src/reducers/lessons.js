import {ADD_LESSONS, UPDATE_LESSON, DELETE_LESSON} from "../actions/lessons";
import {changeItems, removeItem, replaceStore} from "./index";

const initialState = {
    byId: {},
    allId: []
};

export default function (state = initialState, action) {
    console.log('REDUX ACTION', action);
    switch (action.type) {
        case ADD_LESSONS:
            return replaceStore(action.payload);
        case UPDATE_LESSON:
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
        case DELETE_LESSON:
            return removeItem(Object.assign({}, state), action.payload.id);
        default:
            return state;
    }
}
