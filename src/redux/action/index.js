// Action for adding an item to the cart
export const addCart = (product) => {
    return {
        type: "ADDITEM", // Corrigé : doit correspondre au type utilisé dans le reducer
        payload: product,
    };
};

// Action for deleting an item from the cart
export const DelCart = (product) => {
    return {
        type: "DELITEM",
        payload: product,
    };
};
