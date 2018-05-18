
export const addSite = siteObject => ({
  type: 'ADD_SITE',
  site: siteObject,
});

export const siteList = () => ({
  type: 'GET_SITES',
});
