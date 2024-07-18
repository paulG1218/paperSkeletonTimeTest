const initialState = {
    userId: null,
    isAdmin: false,
    email: null,
    cart: []
  };

  const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "authenticated": {
            return {
                ...state,
                userId: action.payload.userId,
                isAdmin: action.payload.isAdmin,
                email: action.payload.email,
              };
        }
        case "addCart": {
            console.log(`payload: ${action.payload}`)
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        }
        case "cartCheck": {
            return {
                ...state,
                cart: action.payload
            }
        }
        default: {
            return state;
        }
    }
  }

  export default reducer