import React from 'react'
import { Link } from 'gatsby'

import Fade from 'react-reveal/Fade';
import Scrollspy from 'react-scrollspy'

import ThemeToggler from '../components/ThemeToggler'
import { isFunctionOrClass } from '../components/reveal-ssr-helper';

// Fallback component for SSR when Fade is not available
const FadeOrDiv = isFunctionOrClass(Fade) ? Fade : (({ children }) => <div>{children}</div>);

// Handle SSR - react-device-detect is nulled during build
function BrowserViewFallback({ children }) {
    return <>{children}</>;
}

let BrowserView = BrowserViewFallback;
if (typeof window !== 'undefined') {
    try {
        const deviceDetect = require('react-device-detect');
        BrowserView = deviceDetect.BrowserView || BrowserViewFallback;
    } catch (e) {
        BrowserView = BrowserViewFallback;
    }
}

class Header extends React.Component {
  scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  render() {
    let isHome=true;
    if (typeof window !== `undefined`) {
      isHome = window.location.pathname === '/';
      // url = new URL(window.location.href);
    }

    const globalPadding = this.props.globalPadding || '';

    let headerClasses = this.props.className || '';
    headerClasses += ' flex pt4 pb3 center ';
    // headerClasses += isHome ? ` fixed-ns top-0 left-0 right-0 bg-background-color z-2 relative` : '';
    headerClasses += isHome ? ` layoutMaxWidth fixed-ns top-0 left-0 right-0 z-2 relative` : globalPadding;
    
    let sections = [
      'Projects',
      'Sideprojects',
      'About me',
      'Speaking',
      'Social'
    ];
    const sectionsSlugs = sections.map( section => section.toLowerCase() );

  
    return (
      <div id="header" className={headerClasses}>
        <BrowserView>
          <ThemeToggler classes='fixed bottom-0 left-0'/>
        </BrowserView>

        <div className="w-100 flex items-center justify-between">
          {/* <FadeOrDiv duration={1500}> */}
            <h1 className="f7">
              <Link to="/" className="link dim near-black fw4 f6">
                Cristiano Dalbem 
              </Link>

              {/* {
                isHome ?
                  <Link to="/" className="link dim near-black fw6">
                    Cristiano Dalbem
                  </Link>
                  :
                  <Link to="/" className="link dim near-black fw6 blue">
                    ← Back
                  </Link>
              } */}
            </h1>
        
            <div className={`${isHome && 'f7 dn db-ns'}`}>
              { 
                isHome ? (
                  <>
                    <Scrollspy
                      items={sectionsSlugs}
                      componentTag="div"
                      currentClassName="tab--selected"
                      offset={-200}
                    >
                      {
                        sections.map( section => (
                          <button
                            className='f6 fw4 pv2 ph3 br-pill ml2 fw4 pointer bn outline-0 tab tab--unselected' 
                            onClick={() => this.scrollToSection(section.toLowerCase())}
                            key={section}
                          >
                            {section}
                          </button>
                        ))
                      }
                    </Scrollspy>
                    <BrowserView>
                      <ThemeToggler classes='fixed top--1 right--2'/>
                    </BrowserView>
                  </>
                )
                  :
                  <Link to="/" className="link dim orange f6 fw4 pv2 ph3 br-pill ba b--orange">
                    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'
                      fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'
                      strokeLinejoin='round' className='feather feather-corner-left-up'>
                      <polyline points='14 9 9 4 4 9' />
                      <path d='M20 20h-7a4 4 0 0 1-4-4V4' />
                    </svg> Back
                  </Link>
              }
            </div>
          {/* </FadeOrDiv> */}
        </div>
      </div>
    );
  }
}

export default Header