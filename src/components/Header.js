import React from 'react'
import { Link } from 'gatsby'

import Fade from 'react-reveal/Fade';
import { ThemeToggler } from 'gatsby-plugin-dark-mode'
import { BrowserView } from 'react-device-detect';
import Scrollspy from 'react-scrollspy'

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
 
    const tabItemClasses = 'ml4 f6 pa0 fw4 pointer bg-transparent outline-0 bn tab tab--unselected';
    let sections = [
      'About',
      'Case studies',
      'Speaking',
      'Social'
    ];
    const sectionsSlugs = sections.map( section => section.toLowerCase() );

    const sunIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-sun"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
    const moonIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
  
    return (
      <div className='flex pt4 pb3 layoutMaxWidth center'>
        <BrowserView>
          <ThemeToggler>
            {({ theme, toggleTheme }) => (
              <label className='fixed pa3 bottom-0 left-0 pointer'>
                <input
                  type="checkbox"
                  className='input-reset'
                  onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                  checked={theme === 'dark'}
                />
                <span className="gray">
                  <span className="absolute right-0 opacity-animate" style={{opacity: theme === 'dark' ? 1 : 0}}>
                    { moonIcon }
                  </span>
                  <span className="absolute right-0 opacity-animate" style={{opacity: theme === 'light' ? 1 : 0}}>
                    { sunIcon }
                  </span>
                </span>

              </label>
            )}
          </ThemeToggler>
        </BrowserView>

        <div className="w-100 flex items-center justify-between">
          <Fade duration={1500}>
            <h1 className="f7">
              <Link to="/" className="link dim near-black fw6 ttu">
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
                isHome ? 
                  <Scrollspy
                    items={sectionsSlugs}
                    componentTag="div"
                    currentClassName="tab--selected"
                    offset={-200}
                  >
                    {
                      sections.map( section => (
                        <button
                          className={tabItemClasses} 
                          onClick={() => this.scrollToSection(section.toLowerCase())}
                          key={section}
                        >
                          {section}
                        </button>
                      ))
                    }
                  </Scrollspy>
                  :
                  <Link to="/" className="link dim fw6 orange pa2">
                    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'
                      fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'
                      strokeLinejoin='round' className='feather feather-corner-left-up'>
                      <polyline points='14 9 9 4 4 9' />
                      <path d='M20 20h-7a4 4 0 0 1-4-4V4' />
                    </svg> Back
                  </Link>
              }
{/* 
              <button
                className='bg-transparent white bn'
                // onClick={() => this.scrollToSection(section.toLowerCase())}
              >
                { sunIcon }
              </button> */}
            </div>
          </Fade>
        </div>
      </div>
    );
  }
}

export default Header