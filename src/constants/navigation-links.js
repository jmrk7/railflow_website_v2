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
        id: 'resources_downloads',
        label: 'Downloads',
        to: '/resources/downloads',
      },
      {
        id: 'resources_documentation',
        label: 'Documentation',
        to: 'https://docs.railflow.io',
        isExternal: true,
      },

      {
        id: 'resources_support',
        label: 'Customer Support',
        to: 'https://railflow.io/contact',
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
      },
      { id: 'about_company', label: 'Company', to: '/about/company' },
      { id: 'about_careers', label: 'Careers', to: '/about/careers' },
    ],
  },
];

export default navigationLinks;
