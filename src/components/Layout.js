import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

import image from '../images/selfie.png';

import Header from './Header'
import Footer from './Footer'
import './tachyons.min.css'
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

      const globalPadding = 'ph5-ns ph4-m ph3 ';

      return (
        <div className="parallax">
          <Helmet>
            <html lang="en"/>
            {/* <link rel="stylesheet" href="https://unpkg.com/tachyons@4/css/tachyons.min.css"/> */}

            <title>Cristiano Dalbem — Product Design Portfolio</title>

            <meta property="og:title" content="Cristiano Dalbem — Product Design Portfolio"/>
            <meta property="og:site_name" content="Cristiano Dalbem — Product Design Portfolio"/>
            <meta property="og:description" content="Portfolio of Cristiano Dalbem, a designer of products and systems, with UX case studies of professional and personal projects."/>
            <meta property="og:image" content={'https://www.cristianodalbem.com' + image}/>
            <meta property="og:url" content="https://www.cristianodalbem.com/"/>
            <meta property="og:type" content="website"/>

            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:title" content="Cristiano Dalbem — Product Design Portfolio"/>
            <meta name="twitter:description" content="Portfolio of Cristiano Dalbem, a designer of products and systems, with UX case studies of professional and personal projects."/>
          </Helmet>
 
          <Header globalPadding={globalPadding}/>

          <div className={globalPadding}>
            {/* <AnimatedChildren/> */}
            {children}
          </div>

          <div className={`${globalPadding} bg-light-gray`}>
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
