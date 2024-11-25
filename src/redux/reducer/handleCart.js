const cart = [];

const handleCart = (state = cart, action) => {
    const product = action.payload;
    switch (action.type) {
        case "ADDITEM":
            // Check if product already exists
            const exist = state.find((x) => x.id === product.id);
            if (exist) {
                // Increase the quantity
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty + 1 } : x
                );
            } else {
                return [
                    ...state,
                    {
                        ...product,
                        qty: 1,
                    },
                ];
            }

        case "DELITEM":
            const exist1 = state.find((x) => x.id === product.id);
            if (exist1.qty === 1) {
                // Remove the item if quantity is 1
                return state.filter((x) => x.id !== product.id);
            } else {
                // Decrease the quantity
                return state.map((x) =>
                    x.id === product.id ? { ...x, qty: x.qty - 1 } : x
                );
            }

        default:
            // Return the current state for unhandled action types
            return state;
    }
};

export default handleCart;
