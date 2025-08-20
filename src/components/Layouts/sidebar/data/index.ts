import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        icon: Icons.HomeIcon,

        items: [
          {
            title: "List Users",
            url: "/",
          },
          {
            title: "Form Add User",
            url: "/forms/form-add",
          },
        ],
      },
      
    ],
  },
];
