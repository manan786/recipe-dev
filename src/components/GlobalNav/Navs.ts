export type Item = {
  name: string;
  slug: string | null;
  icon: string ;
  description?: string;
};

export const demos: Item[] = [
  {
    name: "Manage Ads",
    slug: 'admin/manage-ads',
    icon:"bi-bar-chart-fill",
    description: "Create UI that is shared across routes",
  },
  {
    name: "List New Recipe",
    icon:"bi-plus-lg",
    slug: "admin/list-new-recipe",
    description: "Organize routes without affecting URL paths",
  },
  {
    name: "Listed Recipes",
    icon:"bi-archive-fill",
    slug: "admin/listed-recipes",
    description: "Render multiple pages in the same layout",
  },
  {
    name: "Manage Recipes",
    icon:"bi-grid-fill",
    slug: "admin/manage-recipes",
    description: "Render multiple pages in the same layout",
  },
  {
    name: "Settings",
    icon:"bi-gear",
    slug: "admin/settings",
    description: "Render multiple pages in the same layout",
  },
  {
    name: "FAQ",
    icon:"bi-question-circle-fill",
    slug: "admin/faq",
    description: "Render multiple pages in the same layout",
  },
];
