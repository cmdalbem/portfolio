import React from 'react'

import Reveal from 'react-reveal/Reveal';
import { isFunctionOrClass } from './reveal-ssr-helper';

// Fallback component for SSR when Reveal is not available
const RevealOrDiv = isFunctionOrClass(Reveal) ? Reveal : (({ children }) => <div>{children}</div>);

const LinksList = props => {
  const { items } = props;

  if (!items || !items.map) {
    return null;
  }

  return (
    <div className="f3 fw2">
      <RevealOrDiv effect="slideUp" cascade>
        {
          items.map( (l, i) =>
            <a
              className="animatable link dim db bb b--light-gray pv4 flex"
              target="_blank"
              rel="noopener noreferrer"
              href={l.url}
              key={l.label}
            >
              <div className={`text-gradient-clip w-100 ttext`}>
                {l.label}
              </div>

              {
                l.description &&
                <div className='f6 mt2 silver w-100'>
                  {l.description}
                </div>
              }
            </a>
          )
        }
      </RevealOrDiv>
    </div>
  )
}

export default LinksList