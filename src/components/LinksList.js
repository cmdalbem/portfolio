import React from 'react'

import Reveal from 'react-reveal/Reveal';

const LinksList = props => {
  const { items } = props;

  if (!items || !items.map) {
    return null;
  }

  return (
    <div className="f3 fw2">
      <Reveal effect="slideUp" cascade>
        {
          items.map( (l, i) =>
            <a
              className="animatable link dim db bb b--light-gray pv4 flex"
              target="_blank"
              rel="noopener noreferrer"
              href={l.url}
              key={l.label}
            >
              <div className={`text-gradient-clip bg-gradient-${i+1} w-100`}>
                {l.label}
              </div>
              <div className='f6 mt2 silver w-100'>
                {l.description}
              </div>
            </a>
          )
        }
      </Reveal>
    </div>
  )
}

export default LinksList