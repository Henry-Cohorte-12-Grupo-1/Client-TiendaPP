import { Dispatch } from "redux";
import axios from "axios";
import { url } from "../../api";


export const PROFILE_ACTIONS = {
    BRING_PROFILE_PIC: "BRING_PROFILE_PIC",
};


export const bringProfilePic = (userId: string) => {
    return async (dispatch: Dispatch) => {
        const pictureId = await axios.get<any[]>(`${url}/user/getProfilePic/${userId}`, { headers: { Authorization: `Bearer ${localStorage.token}` } });
        dispatch({
            type: PROFILE_ACTIONS.BRING_PROFILE_PIC,
            profilePic: pictureId.data,
        });
    };
};