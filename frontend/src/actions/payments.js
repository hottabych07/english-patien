
export const ADD_PAYMENT = '@app/payments/add',
    ADD_PAYMENTS = '@app/payments/adds',
    UPDATE_PAYMENT = '@app/payments/update',
    DELETE_PAYMENT = '@app/payments/delete'
;
/*
 * action creators
 */

export function addPayments(payload = {}) {
    return {
        type: ADD_PAYMENTS,
        payload
    };
}

export function addPayment(payload = []) {
    return {
        type: ADD_PAYMENT,
        payload
    };
}

export function updatePayment(payload = {}) {
    return {
        type: UPDATE_PAYMENT,
        payload
    };
}

export function deletePayment(payload = {}) {
    return {
        type: DELETE_PAYMENT,
        payload
    };
}