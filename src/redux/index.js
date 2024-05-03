import { configureStore } from '@reduxjs/toolkit'
import rootReducer from "./rootReducer";
import userApi from "./apps/users/userApi";
import productApi from "./apps/products/api";
import newsApi from "./apps/news/api";
import profileApi from "./apps/profile/profileApi";
import ordersApi from "./apps/orders/ordersApi";
import contactApi from "./apps/contact/contactApi";
import dashboardApi from "./apps/dashboard/dashboardApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware)=> {
    return getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(productApi.middleware)
      .concat(newsApi.middleware)
      .concat(profileApi.middleware)
      .concat(ordersApi.middleware)
      .concat(contactApi.middleware)
      .concat(dashboardApi.middleware)
  }
  ,
})

export default store
