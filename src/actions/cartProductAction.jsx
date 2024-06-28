export const CART_PRODUCT = "CART_PRODUCT";

export const cartProductAction = (val) => {
    return {
        type: CART_PRODUCT,
        payload: val,
    }
}