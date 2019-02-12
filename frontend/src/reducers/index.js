import { combineReducers } from 'redux';
import cuid from 'cuid';

import user from './user';
import users from './users';
import learners from './learners';
import groups from './groups';
import courses from './courses';
import lessons from './lessons';
import payments from './payments';

Object.size = function(obj) {
    let size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

export function changeItems(state, items) {
    let byId = Object.assign({}, state.byId);

    let stateCopy = Object.assign({}, state)
    items.forEach(item => {
        if (!item.id) {
            let newId = cuid();
            item.id = newId;
        }
        console.log('Object.size(byId[item.id]): ',Object.size(byId[item.id]));
        console.log('item.id: ',item.id);
        if ((Object.size(byId[item.id]) === 0)) {
            stateCopy.allId.push(item.id);
        }
        console.log('stateCopy.allId: ',stateCopy.allId);
        byId[item.id] = item;
    });

    console.log('stateCopy.allId after: ',stateCopy.allId);
    return {
        byId,
        allId: stateCopy.allId
    }
}

export function replaceStore(items) {
    let byId = {};
    let allId = [];
    items.forEach(item => {
        if (!item.id) {
            let newId = cuid();
            item.id = newId;
        }

        if (!byId[item.id]) {
            allId.push(item.id);
        }
        byId[item.id] = item;
    });
    return {
        byId,
        allId
    }
}

export function removeItem({ byId, allId }, id) {
    delete byId[id];
    console.log('new deleted state', {
        byId,
        allId: allId.filter(itemId => itemId.toString() !== id.toString())
    });
    return {
        byId,
        allId: allId.filter(itemId => itemId.toString() !== id.toString())
    }
}

const allReducers = combineReducers({
    user,
    entities: combineReducers({
        users,
        courses,
        groups,
        lessons,
        learners,
        payments
    })
});

export default allReducers;
