import {createSlice} from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    checkout: [],
    loading: false,
    error: null,
    totalPrice: null,
    totalPriceCheckout: null,
    selectedPartner: null
  },
  reducers: {
    addToCart: (state, {payload}) => {
      const existingItemIndex = state.cart.findIndex(item => item.product_id === payload.product_id);
      if (existingItemIndex !== -1) {
        // If the product already exists in the cart, increase its quantity
        state.cart[existingItemIndex].quantity += payload.quantity;
      } else {
        // If the product is not present in the cart, add it to the cart
        state.cart.push(payload);
      }
    },
    increaseQuantity: (state, {payload}) => {
      const itemIndex = state.cart.findIndex(item => item.product_id === payload.product_id);
      if (itemIndex !== -1) {
        state.cart[itemIndex].quantity += 1;
      }
    },
    decreaseQuantity: (state, {payload}) => {
      const itemIndex = state.cart.findIndex(item => item.product_id === payload.product_id);
      if (itemIndex !== -1 && state.cart[itemIndex].quantity > 1) {
        state.cart[itemIndex].quantity -= 1;
      }
    },
    calculateTotalPrice: state => {
        state.totalPrice = state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    calculateCheckoutTotalPrice: state => {
      state.totalPriceCheckout = state.checkout.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    moveToCheckout: (state, {payload}) => {
      state.checkout = payload;
    },
    resetCardAndCheckout: state => {
      state.checkout = []
      state.cart = []
    },
    moveToCart: (state,{payload}) => {
      state.checkout = state.checkout.filter(item=> item?.product_id !== payload?.product_id)
      state.cart.push(payload)
    },
    setSelectedPartner: (state, {payload}) => {
      state.selectedPartner = payload
    }
  },
})


export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  calculateTotalPrice,
  moveToCart,
  moveToCheckout,
  calculateCheckoutTotalPrice,
  setSelectedPartner,
  resetCardAndCheckout
} = cartSlice.actions

export default cartSlice
