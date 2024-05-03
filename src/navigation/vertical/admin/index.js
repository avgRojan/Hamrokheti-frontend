const navigation = () => {
  return [
    {
      title: 'Home',
      path: '/admin',
      icon: 'tabler:smart-home',
    },
    {
      title: 'Admin Config',
      icon: 'tabler:',
      children: [
        {
          title: 'Update News',
          path: '/admin/admin-config/update-news',
          icon: 'tabler:',
        },
        {
          title: 'Update Veg Market',
          path: '/admin/admin-config/update-veg-market',
          icon: 'tabler:',
        }
      ]
    },
    {
      title: 'User List',
      path: '/admin/users-list',
      icon: 'tabler: users',
      children: [
        {
          title: 'Users',
          path: '/admin/users-list/users',
          icon: 'tabler:'
        },
        {
          title: 'Admin',
          path: '/admin/users-list/admin',
          icon: 'tabler:'
        },
        {
          title: 'Customer',
          path: '/admin/users-list/customer',
          icon: 'tabler:'
        },
        {
          title: 'Farmer',
          path: '/admin/users-list/farmer',
          icon: 'tabler:'
        },
        {
          title: 'Partner',
          path: '/admin/users-list/partner',
          icon: 'tabler:'
        }
      ]
    },
    {
      title: 'Orders List',
      icon: 'tabler:',
      path: '/admin/order-list',
    },
    {
      title: 'Products List',
      icon: 'tabler:',
      path: '/admin/products-list',
    },
    {
      title: 'Contact List',
      icon: 'tabler:',
      path: '/admin/contact-list',
    }
  ]
}

export default navigation
