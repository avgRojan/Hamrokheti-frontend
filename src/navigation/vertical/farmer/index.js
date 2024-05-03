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
      children: [
        {
          title: 'Products',
          path: '/products',
          icon: 'dashicons:products',
        },
        {
          title: 'Add Product',
          path: '/products/add-products',
          icon: 'ion:bag-add-outline',
        },
        {
          title: 'My Products',
          path: '/products/my-products',
          icon: 'ion:bag-outline',
        }
      ]
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
    {
      title: 'Orders',
      path: '/orders',
      icon: 'material-symbols:order-approve-rounded',
      children: [
        {
          title:'Order Request',
          path: '/orders/order-request',
          icon:'fluent:branch-request-20-filled'
        }
      ]
    },

  ]
}

export default navigation
