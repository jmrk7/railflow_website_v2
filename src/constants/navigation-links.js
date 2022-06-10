// TODO: use GraphQL instead.
const navigationLinks = [
  {
    id: 'features',
    label: 'Features',
    mainRoute: '/',
    sectionElementId: 'features',
  },
  { id: 'pricing', label: 'Pricing', to: '/pricing' },
  {
    id: 'resources',
    label: 'Resources',
    dropdownLinks: [
      {
        id: 'resources_downloads_testrail',
        label: 'Railflow For TestRail',
        hasSubmenu: true,
        to: "/",
        items: [
          {
            id: 'resources_downloads_testrail_download',
            label: 'Downloads',            
            to: '/resources/testrail/downloads'
          },
          {
            id: 'resources_downloads_testrail_doc',
            label: 'Documentation',            
            to: 'https://docs.railflow.io',            
            isExternal: true,
          }
        ],
      },
      {
        id: 'resources_downloads_zephyr',
        label: 'Railflow For Zephyr',
        hasSubmenu: true,
        to: "/",
        items: [
          {
            id: 'resources_downloads_testrail_download',
            label: 'Downloads',            
            to: 'resources/zephyr/downloads'
          },
          {
            id: 'resources_downloads_testrail_doc',
            label: 'Documentation',            
            to: 'https://docs.railflow.io',
            isExternal: true,
          }
        ],
      },
      {
        id: 'resources_support',
        label: 'Customer Support',
        to: 'https://railflow.io/contact',
        isExternal: true,
      },
    ],
  },
  // {
  //   id: 'forums',
  //   label: 'Forums',
  //   to: 'https://forums.railflow.io/ ',
  //   isExternal: true,
  // },
  {
    id: 'about',
    label: 'About',
    dropdownLinks: [
      // TODO: update routes
      {
        id: 'about_contact',
        label: 'Contact Us',
        to: 'https://railflow.io/contact',
        isExternal: true,
      },
      { id: 'about_company', label: 'Company', to: '/about/company' },
      { id: 'about_careers', label: 'Careers', to: '/about/careers' },
    ],
  },
];

export default navigationLinks;
