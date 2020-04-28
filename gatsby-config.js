module.exports = {
  siteMetadata: {
    title: 'Cristiano Dalbem',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Cristiano Dalbem Portfolio',
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
        fonts: [`Muli\:400,600,700,900`, `Rozha One\:400`]
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
              backgroundColor: '#ffffff',
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
      resolve: '@halkeye/gatsby-source-goodreads',
      options: {
        developerKey: 'toGLdnsikKAbTOmaFiPrw',
        goodReadsUserId: '14179336',
        userShelf: 'currently-reading',
      },
    }
  ],
}
