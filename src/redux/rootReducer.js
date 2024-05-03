import userApi from "./apps/users/userApi";
import productApi from "./apps/products/api";
import newsApi from "./apps/news/api";
import cartSlice from "./apps/cart";
import profileApi from "./apps/profile/profileApi";
import orderApi from "./apps/orders/ordersApi";
import contactApi from "./apps/contact/contactApi";
import dashboardApi from "./apps/dashboard/dashboardApi";

const rootReducer = {
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [contactApi.reducerPath]: contactApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer
}

export default rootReducer
