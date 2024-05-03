const navigation = () => [
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
    path: '/orders/order-request/customer',
    icon: 'fluent:branch-request-20-filled',
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
    title: 'About Us',
    path: '/about-us',
    icon: 'dashicons:editor-help',
  },
  {
    title: 'Contact Us',
    path: '/contact-us',
    icon: 'dashicons:phone',
  }
]

export default navigation
