import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import AnimateLoad from '../components/AnimateLoad'

import Header from './Header'
import Footer from './Footer'
import './layout.css'

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => {
      let isHome = true;
      if (typeof window !== `undefined`) {
        isHome = window.location.pathname === '/';
      }

      const globalPadding = 'ph6-ns ph4-m ph3';

      let headerClasses = `${globalPadding} `;  
      headerClasses += isHome ? ` fixed-ns top-0 left-0 right-0 bg-background-color z-2 relative` : '';

      const AnimatedHeader = AnimateLoad(Header);
      // const AnimatedChildren = AnimateLoad(children);
 
      return (
        <div className="parallax">
          <Helmet
            title={data.site.siteMetadata.title}
            meta={[
              { name: 'description', content: 'Personal website of Cristiano Dalbem, a designer of products and systems.' },
            ]}
          >
            <html lang="en" />
            <link 
              rel="stylesheet"
              href="https://unpkg.com/tachyons@4/css/tachyons.min.css"
            />
          </Helmet>
 
          <div className={headerClasses}>
            <AnimatedHeader/>
          </div>

          <div className={`${globalPadding} mt2 mb0`}>
            {/* <AnimatedChildren/> */}
            {children}
          </div>

          <div className={`${globalPadding} bg-dark-gray`}>
            <Footer/>
          </div>
        </div>
      )
    }}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
