export const adminMenu = [
  // Quản lý người dùng
  {
    name: "menu.admin.manage-user",
    menus: [
      // {
      //   subMenus: [
      //     {
      //       name: "menu.system.system-administrator.user-manage",
      //       link: "/system/user-manage",
      //     },
      //     {
      //       name: "menu.system.system-administrator.user-redux",
      //       link: "/system/user-redux",
      //     },
      //   ],
      // },
      { name: "menu.admin.curd-user", link: "/system/user-manage" },
      { name: "menu.admin.curd-redux", link: "/system/user-redux" },
      { name: "menu.admin.manage-doctor", link: "/system/user-doctor" },
      { name: "menu.admin.manage-admin", link: "/system/user-admin" },
    ],
  },
  // Quản lý phòng khám
  {
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
      },
    ],
  },
  // Quản lý chuyên khoa
  {
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/user-specialty",
      },
    ],
  },
  // Quản lý cẩm nang
  {
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.manage-handbook",
        link: "/system/user-handbook",
      },
    ],
  },
];
