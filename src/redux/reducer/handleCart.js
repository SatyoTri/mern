const cart = [];

const handleCart = (state = cart, action) => {
    const product = action.payload;
    switch (action.type) {
        case "GET_CART":
            return product.items;

        case "ADDITEM":
            const exist = state.find((x) => x.productId._id === product.productId._id);
            if (exist) {
                return state.map((x) =>
                    x.productId._id === product.productId._id ? { ...x, quantity: x.quantity + 1 } : x
                );
            } else {
                return [...state, { ...product, quantity: 1 }];
            }

        case "UPDATEITEM":
            return state.map((x) =>
                x.productId._id === product.productId._id ? { ...x, quantity: product.quantity } : x
            );

        case "DELITEM":
            return state.filter((x) => x.productId._id !== product.productId._id);

        case "GET_CART_FAILURE":
        case "ADDITEM_FAILURE":
        case "UPDATEITEM_FAILURE":
        case "DELITEM_FAILURE":
            console.error(action.payload);
            return state;

        default:
            return state;
    }
};

export default handleCart;