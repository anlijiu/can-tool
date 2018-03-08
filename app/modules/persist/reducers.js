import {REHYDRATE} from "redux-persist";

export default function hasRehydrated (state = false, action) {
    return action.type === REHYDRATE ? true : state;
}
