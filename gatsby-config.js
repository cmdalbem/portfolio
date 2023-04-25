module.exports = {
  siteMetadata: {
    title: 'Cristiano Dalbem — Product Design Portfolio',
    siteUrl: 'https://cristianodalbem.com/',
  },
  plugins: [
    'gatsby-plugin-dark-mode',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Cristiano Dalbem — Product Design Portfolio',
        short_name: 'Cristiano Dalbem',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'minimal-ui',
        icon: 'src/images/icon.png',
      },
    },
    // 'gatsby-plugin-offline',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Syne\:400`]
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-19085664-5',
        // Puts tracking script in the head instead of the body
        head: true,
        // Setting this parameter is optional
        anonymize: false,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ['localhost*'],
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Any additional create only fields (optional)
        siteSpeedSampleRate: 100,
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        id: 1097552,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images-grid',
            options: {
              gridGap: '2%',
              margin: 'auto',
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1440,
              quality: 90,
              linkImagesToOriginal: true,
              showCaptions: true,
              backgroundColor: 'transparent',
            },
          },
          'gatsby-remark-smartypants',
          'gatsby-remark-reading-time',
          'gatsby-remark-component',
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 800,
              related: false,
              noIframeBorder: true,
            },
          },
          `gatsby-remark-responsive-iframe`,
        ],
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
      },
    },
    'gatsby-plugin-catch-links',
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-PXK99D4",
  
        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,
  
        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },
  
        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",
  
        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
        // routeChangeEventName: "YOUR_ROUTE_CHANGE_EVENT_NAME",
        
        // Defaults to false
        enableWebVitalsTracking: true,
        
        // Defaults to https://www.googletagmanager.com
        // selfHostedOrigin: "YOUR_SELF_HOSTED_ORIGIN",
      },
    },
  ],
}
