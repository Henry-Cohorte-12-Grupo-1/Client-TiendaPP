import { PROFILE_ACTIONS } from "./profilePicActions";
import { StoreType } from "../interfaces/reduxStore";
import { IAction } from "../interfaces/reduxActions";
import { initialState } from "../store/initialState";

export function profilePicReducer(
    state: StoreType = initialState,
    action: IAction
) {
    switch (action.type) {
        case PROFILE_ACTIONS.BRING_PROFILE_PIC:
            return {
                ...state,
                profilePic: action.profilePic,
            };
        default:
            return state;
    }
}