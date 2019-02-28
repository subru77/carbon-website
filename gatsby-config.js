require('dotenv').config();

const path = require('path');

const { PATH_PREFIX = '/' } = process.env;

module.exports = {
  pathPrefix: PATH_PREFIX,
  siteMetadata: {
    title: 'Carbon Design System',
    titleInternal: 'IBM Product Design',
  },
  plugins: [
    {
      resolve: `gatsby-mdx`,
      options: {
        root: __dirname,
        defaultLayouts: {
          default: require.resolve('./src/components/Layouts/index.js'),
        },
        globalScope: `
        import AnchorLinks from '${__dirname}/src/components/AnchorLinks';
        import ClickableTile from '${__dirname}/src/components/ClickableTile';
        import FeatureTile from '${__dirname}/src/components/FeatureTile';
        import DoDontExample from '${__dirname}/src/components/DoDontExample';
        import ComponentCode from '${__dirname}/src/components/ComponentCode';
        import ComponentReact from '${__dirname}/src/components/ComponentReact';
        import ComponentDocs from '${__dirname}/src/components/ComponentDocs';
        import ImageComponent from '${__dirname}/src/components/ImageComponent';
        import ColorBlock from '${__dirname}/src/components/ColorBlock';
        import WebsiteTabs from '${__dirname}/src/components/WebsiteTabs';
        import SimpleColumns from '${__dirname}/src/components/SimpleColumns';
        import Video from '${__dirname}/src/components/Video';
        import { Row, Column } from '${__dirname}/src/components/Grid/Grid';

        export default {
          AnchorLinks,
          WebsiteTabs,
          SimpleColumns,
          ClickableTile,
          FeatureTile,
          DoDontExample,
          ImageComponent,
          ComponentDocs,
          ComponentCode,
          ComponentReact,
          ColorBlock,
          Video,
          Row,
          Column
        };
      `,
        gatsbyRemarkPlugins: [
          { resolve: 'gatsby-remark-unwrap-images' },
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1120,
              linkImagesToOriginal: false,
              backgroundColor: 'transparent',
            },
          },
          {
            resolve: 'gatsby-remark-embed-video',
            options: {
              width: 1024,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77  // height: 333, 1584Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
            },
          },
          { resolve: 'gatsby-remark-responsive-iframe' },
          { resolve: 'gatsby-remark-copy-linked-files' },
          { resolve: 'gatsby-remark-smartypants' },
          { resolve: 'gatsby-plugin-catch-links' },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-131128838-1',
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Carbon Design System`,
        short_name: `Carbon`,
        start_url: `/`,
        background_color: `#000000`,
        theme_color: `#cccccc`,
        display: `minimal-ui`,
        icon: `src/content/global/images/favicon-32.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content/`,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        includePaths: [path.resolve(__dirname, 'node_modules')],
        importer: (url, prev, done) => {
          done({
            file: !/import-once(\.scss)?$/.test(url)
              ? url
              : path.resolve(__dirname, 'src/styles/import-once'),
          });
        },
      },
    },
  ],
};
