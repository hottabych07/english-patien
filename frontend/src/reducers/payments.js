import {ADD_PAYMENTS, ADD_PAYMENT, UPDATE_PAYMENT, DELETE_PAYMENT} from "../actions/payments";
import {changeItems, removeItem, replaceStore} from "./index";

const initialState = {
    byId: {},
    allId: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_PAYMENTS:
            return replaceStore(action.payload);
        case ADD_PAYMENT:
            return changeItems(state, action.payload);
        case UPDATE_PAYMENT:
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
        case DELETE_PAYMENT:
            return removeItem(Object.assign({}, state), action.payload.id);
        default:
            return state;
    }
}
