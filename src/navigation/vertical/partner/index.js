const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/home',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Products',
      path: '/products',
      icon: 'dashicons:products',
    },
    {
      title: 'Orders',
      path: '/orders/order-request/partner',
      icon: 'dashicons:products',
    },
    {
      title: 'News',
      path: '/news',
      icon: 'dashicons:info',
      children: [
        {
          title: 'News',
          path: '/news',
          icon: 'dashicons:info',
        },
        {
          title: 'Vegetable Market Rates',
          path: '/news/vegetable-market',
          icon: 'ion:bag-add-outline',
        }
      ]
    },

  ]
}

export default navigation
