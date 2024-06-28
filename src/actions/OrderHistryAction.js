export const ORDERED_PRODUCT = "ORDERED_PRODUCT";

export const orderProductAction = (val) => {
    return {
        type: ORDERED_PRODUCT,
        payload: val,
    }
}