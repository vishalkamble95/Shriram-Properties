const ENVIRONMENT = "LOCAL";
// const ENVIRONMENT = "PRODUCTION";



let BASE_URL;
let DEFAULT_DOMAIN;

if (ENVIRONMENT === "PRODUCTION") {
  BASE_URL = 'https://www.buyindiahomes.in/api';  // Production URL
  DEFAULT_DOMAIN = "builderkonnect.com";  // Production domain
} else {
  BASE_URL = 'https://www.buyindiahomes.in/api';  // Local development URL (you can use localhost if required)
  DEFAULT_DOMAIN = "shrirampropertiesinpune.com"; 
  // DEFAULT_DOMAIN = "megapolisshimmerhinjewadi.com";  
  // DEFAULT_DOMAIN = "smp-amberwoodrahatani.com"; 
  // Local domain (for consistency)
}

const getDomain = () => {
  // Check if window is available (i.e., client-side)
  if (ENVIRONMENT === "PRODUCTION") {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname; // Get domain from client
      return hostname.startsWith("www.") ? hostname.slice(4) : hostname;
    }
    // Default for server-side
    return DEFAULT_DOMAIN.startsWith("www.") ? DEFAULT_DOMAIN.slice(4) : DEFAULT_DOMAIN;
  } else {
    return DEFAULT_DOMAIN.startsWith("www.") ? DEFAULT_DOMAIN.slice(4) : DEFAULT_DOMAIN;
  }
};


const WEBSITE_DOMAIN = getDomain();


const getApiUrl = (endpoint) => {
  // const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
  // const WEBSITE_DOMAIN = "10.211.55.3";
  const WEBSITE_DOMAIN = getDomain();
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', WEBSITE_DOMAIN);
  console.log(`${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`);
  return `${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`;
};


const getDataProject = (endpoint,domain,slug) => {
  // const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
  // const WEBSITE_DOMAIN = "10.211.55.3";
  const WEBSITE_DOMAIN = domain;
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', WEBSITE_DOMAIN);
  console.log(`${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}&project=${slug}`);
  return `${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}&project=${slug}`;
};


const getDataSlug = (endpoint,slug) => {
  // const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
  // const WEBSITE_DOMAIN = "10.211.55.3";
  const WEBSITE_DOMAIN = getDomain();
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', WEBSITE_DOMAIN);
  console.log(`${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}&project=${slug}`);
  return `${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}&project=${slug}`;
};


const getDomainDataSlug = (endpoint,domain,slug) => {
  // const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
  // const WEBSITE_DOMAIN = "10.211.55.3";
  const WEBSITE_DOMAIN = getDomain();
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', domain);
  console.log(`${BASE_URL}/${endpoint}?website=${domain}&project=${slug}`);
  return `${BASE_URL}/${endpoint}?website=${domain}&project=${slug}`;
};

const getBlogData = (endpoint , domain) => {
  console.log('BLOGDAA');
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', domain);
  console.log(`${BASE_URL}/${endpoint}?website=${domain}`);
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};



const getSeoData = (endpoint , domain) => {
  console.log('SEODATA');
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', domain);
  console.log(`${BASE_URL}/${endpoint}?website=${domain}`);
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};


const getStudiotemplate = (endpoint , domain) => {
  console.log('SEODATA');
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', domain);
  console.log(`${BASE_URL}/${endpoint}?website=${domain}`);
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};

const getPropertyData = (endpoint , domain) => {
  console.log('PropertyData');
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', domain);
  console.log(`${BASE_URL}/${endpoint}?website=${domain}`);
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};

const getApiUrlmetadata = (endpoint,domain) => {
  // const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
  // const WEBSITE_DOMAIN = "10.211.55.3";
  const WEBSITE_DOMAIN = "smp-amberwoodrahatani.com";
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', WEBSITE_DOMAIN);
  console.log('Logs: - ',`${BASE_URL}/${endpoint}?website=${WEBSITE_DOMAIN}`);
  return `${BASE_URL}/${endpoint}?website=${domain}`;
};

const getblogspost = (endpoint,post_slug,domain) => {
  // const WEBSITE_DOMAIN = typeof window !== 'undefined' ? window.location.hostname : 'builderkonnect.com';
  // const WEBSITE_DOMAIN = "10.211.55.3";
  const WEBSITE_DOMAIN = domain;
  // Log the endpoint and the website domain
  console.log('API Endpoint:', endpoint);
  console.log('Website Domain:', domain);
  console.log('Logs: - ',`${BASE_URL}/${endpoint}/${post_slug}?website=${domain}`);
  return `${BASE_URL}/${endpoint}/${post_slug}?website=${domain}`;
};

// console.log('Website Domain:', `${BASE_URL}/header?website=${WEBSITE_DOMAIN}`);

const API = {
  METAHEADER: (domain) => getApiUrlmetadata('header',domain),
  HEADER: () => getApiUrl('header'),
  MAHARERA: () => getApiUrl('rera'),
  PROPERTY_PRICES: () => getApiUrl('property-prices'),
  GALLERY: () => getApiUrl('gallary'),
  VIDEO: () => getApiUrl('video'),
  AMENITIES: () => getApiUrl('amenities'),
  BANKS: () => getApiUrl('banks'),
  // PROPERTY_DETAILS: () => getApiUrl('propert-details'),
  PROPERTY_DETAILS: (domain) => getPropertyData('propert-details',domain),
  UNIT_LAYOUT: () => getApiUrl('unit-layout'),
  FLOOR_PLANS: () => getApiUrl('floor-layout'),
  MASTER_LAYOUT: () => getApiUrl('master-layout'),
  LOCATION_MAP: () => getApiUrl('location-map'),
  LOCATION_ADVANTAGES: () => getApiUrl('location-advantages'),
  FAQ: () => getApiUrl('faq'),
  BLOGS: () => getApiUrl('blogs'),
  GET_BLOG: (domain) => getBlogData('blogs',domain),
  BLOGS_DETAIL: (post_slug,domain) => getblogspost('blogs',post_slug,domain),
  TESTIMONIALS: () => getApiUrl('testimonials'),
  CONTACT_US: () => getApiUrl('contact-us'),
  ADVERTISEMENT: () => getApiUrl('advertisement'),
  FOOTER: () => getApiUrl('footer'),
  TEMPLATE: () => getApiUrl('template'),
  GET_PROPERTIES: () => getApiUrl('get-properties'),
  GET_PROPERTIES_SITEMAP: (domain) => getBlogData('get-properties',domain),
  SEO_DETAIL: (domain) => getSeoData('seo-detail',domain),

  // Studio APIS
  PROPERTY_DETAILS_STUDIO:(domain,slug) => getDataProject('propert-details',domain,slug),
  GALLERY_STUDIO: ( slug) => getDataSlug('gallary',slug),
  MAHARERA_STUDIO: (slug) => getDataSlug('rera',slug),
  VIDEO_STUDIO: (slug) => getDataSlug('video',slug),
  AMENITIES_STUDIO: (slug) => getDataSlug('amenities',slug),
  PROPERTY_PRICES_STUDIO: (slug) => getDataSlug('property-prices',slug),
  UNIT_LAYOUT_STUDIO: (slug) => getDataSlug('unit-layout',slug),
  FLOOR_PLANS_STUDIO: (slug) => getDataSlug('floor-layout',slug),
  MASTER_LAYOUT_STUDIO: (slug) => getDataSlug('master-layout',slug),
  LOCATION_MAP_STUDIO: (slug) => getDataSlug('location-map',slug),
  LOCATION_ADVANTAGES_STUDIO: (slug) => getDataSlug('location-advantages',slug),
  HEADER_STUDIO: (domain ,slug) => getDomainDataSlug('header',domain , slug),
  SEO_DETAIL_STUDIO: (domain, slug) => getDomainDataSlug('seo-detail',domain ,slug),
  TEMPLATE_STUDIO: (domain) => getStudiotemplate('template',domain),
  KNOW_YOUR_RETURNS_STUDIO: (slug) => getDataSlug('returns',slug),
  STUDIO_ADVERTISEMENT: () => getApiUrl('studio_advertisement'),
  STUDIO_ADVERTISEMENT_SLUG: (slug) => getDataSlug('studio_advertisement',slug),

  // POST APIS
  postContactUs: `${BASE_URL}/contact?website=${WEBSITE_DOMAIN}`,

};

export  { API, WEBSITE_DOMAIN , DEFAULT_DOMAIN};
