const path = require('path')

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    title: `Naturegel`,
    description: `Fabricante do melhor Álcool gel antisséptico hidratante de rápida absorção para as mãos do Brasil`,
    keywords: `naturegel, alcool gel, gel, alcool`,
    siteUrl: `https://www.naturegel.com.br`,
    siteLogo: `https://www.naturegel.com.br/logo.png`,
    siteVerification: {
      google: ``,
      bing: ``
    },
    description: `Fabricante do melhor Álcool gel antisséptico hidratante de rápida absorção para as mãos do Brasil.`,
    author: `Naturegel`,
    social: {
      twitter: `@naturegel`,
      fbappid: ``
    },
    socialLinks: {
      twitter: `https://twitter.com/naturegel`,
      facebook: `https://www.facebook.com/naturegelcosmeticos`,
      instagram: `https://www.instagram.com/naturegel`,
      linkedin: ``,
      pinterest: `https://www.pinterest.com/naturegel/`,
      youtube: `https://www.youtube.com/channel/naturegel`,
      stackoverflow: ``,
      github: ``,
      email: `contato@naturegel.com.br`,
      phone: `(16) 99107-4407`,
      mobile: `(16) 99107-4407`,
      address: `São Carlos - SP`
    },
    organization: {
      name: `Naturegel`,
      url:`https://www.naturegel.com.br`
    }
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/images/`,
        name: `images`,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        //useMozJpeg: false,
        //stripMetadata: true,
        defaultQuality: 90,
      },
    },
    `gatsby-plugin-catch-links`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-source-shopify`,
      options: {
        // The domain name of your Shopify shop. This is required.
        // Example: 'gatsby-source-shopify-test-shop' if your Shopify address is
        // 'gatsby-source-shopify-test-shop.myshopify.com'.
        shopName: process.env.SHOP_NAME,

        // An API access token to your Shopify shop. This is required.
        // You can generate an access token in the "Manage private apps" section
        // of your shop's Apps settings. In the Storefront API section, be sure
        // to select "Allow this app to access your storefront data using the
        // Storefront API".
        // See: https://help.shopify.com/api/custom-storefronts/storefront-api/getting-started#authentication
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,

        apiVersion: '2020-07',
        // Set verbose to true to display a verbose output on `npm run develop`
        // or `npm run build`. This prints which nodes are being fetched and how
        // much time was required to fetch and process the data.
        // Defaults to true.
        verbose: false,
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: `GTM-N75ZN35`,

        // Include GTM in development.
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: true,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        // Defaults to null
        defaultDataLayer: { platform: "gatsby", webproperty: "www.naturagel.com.br", author: "naturegel cosméticos" },

        // Specify optional GTM environment details.
        //gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        //gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        //dataLayerName: "YOUR_DATA_LAYER_NAME",
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Naturegel",
        short_name: "Naturegel",
        theme_color: "#a0c03c",
        background_color: "#a0c03c",
        homepage_url: "https://www.naturegel.com.br",
        start_url: "/",
        display: "standalone",
        crossOrigin: "use-credentials",
        icons: [
          {
            src: "/android-chrome-36x36.png",
            sizes: "36x36",
            type: "image/png"
          },
          {
            src: "/android-chrome-48x48.png",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "/android-chrome-72x72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "/android-chrome-96x96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "/android-chrome-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/android-chrome-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "/android-chrome-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        /*importScripts: [
          `./sw-extension.js`
        ],*/
        cacheId: `naturegel-site-offline`
      }
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          //'/static/*': [
          //  'Cache-Control: public; max-age=31536000; immutable',
          //],
          /*'/*.webp': [
            'Cache-Control: public; max-age=31536000; immutable',
          ],
          '/*.js': [
            'Cache-Control: public; max-age=31536000; immutable',
          ],*/
          //'/*.css': [
          //  'Cache-Control: public; max-age=31536000; immutable',
          //],
          /*'/sw.js': [
            'Cache-Control: public; max-age=0; must-revalidate',
          ],
          '/sw-extension.js': [
            'Cache-Control: public; max-age=0; must-revalidate',
          ],*/
        },
        mergeSecurityHeaders: true,
        mergeLinkHeaders: true,
        mergeCachingHeaders: true,
      },
    },
    `gatsby-plugin-netlify-cache`
  ],
};
