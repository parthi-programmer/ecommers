export const CURRENT_PRODUCT = "CURRENT_PRODUCT";

export const currentProductAction = (val) => {
    return {
        type: CURRENT_PRODUCT,
        payload: val,
    }
}

