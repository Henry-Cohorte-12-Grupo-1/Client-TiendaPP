import { Dispatch } from "redux";
import axios from "axios";
import { url } from "../../api";

export const SELLER_ACTIONS = {
    BRING_SELLER_PROFILE: "BRING_SELLER_PROFILE",
};

export const bringSellerProfile = (userName: string) => {
    return async (dispatch: Dispatch) => {
        const sellerProfile = await axios.get<any[]>(
            `${url}/seller/${userName}`
        );
        dispatch({
            type: SELLER_ACTIONS.BRING_SELLER_PROFILE,
            payload: sellerProfile.data,
        });
    };
};
