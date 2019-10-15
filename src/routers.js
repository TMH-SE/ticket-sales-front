export const publicRouters = [
  {
    exact: true,
    path: '/home',
    key: 'home',
    component: 'home'
  },
  {
    exact: true,
    path: '/login',
    key: 'login',
    component: 'login'
  },
  {
    exact: true,
    path: '/datVe',
    key: 'booking',
    component: 'datVe'
  },
  {
    exact: true,
    path: '/lichTrinh',
    key: 'schedule',
    component: 'lichTrinh'
  },
  {
    exact: true,
    path: '/lienHe',
    key: 'contacts',
    component: 'lienHe'
  }
]

export const privateRouters = [
  {
    exact: true,
    path: '/dashboard',
    component: 'dashboard'
  },
  {
    exact: true,
    path: '/quanLyXe',
    component: 'quanLyXe'
  },
  {
    exact: true,
    path: '/quanLyChuyen',
    component: 'quanLyChuyen'
  },
  {
    exact: true,
    path: '/quanLyTuyen',
    component: 'quanLyTuyen'
  }
]

export const adminMenu = [
  {
    title: 'Quản lý xe',
    icon: 'car',
    to: '/quanLyXe'
  },
  {
    title: 'Quản lý tuyến xe',
    icon: 'deployment-unit',
    to: '/quanLyTuyen'
  },
  {
    title: 'Quản lý chuyến xe',
    icon: 'interaction',
    to: '/quanLyChuyen'
  }
]

export const publicMenu = [
  {
    title: 'Trang chủ',
    key: 'home',
    to: '/home'
  },
  {
    title: 'Đặt vé',
    key: 'booking',
    to: '/datVe'
  },
  {
    title: 'Lịch trình',
    key: 'schedule',
    to: '/lichTrinh'
  },
  {
    title: 'Liên hệ',
    key: 'contacts',
    to: '/lienHe'
  }
]
