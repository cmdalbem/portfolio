import React from 'react'

import LinksList from './LinksList'

const Social = () => {
  const items = [
    {
      label: 'LinkedIn',
      url: "https://www.linkedin.com/in/cmdalbem/"
    },
    {
      label: 'Email',
      url: "mailto:cristiano.dalbem@gmail.com"
    },
    {
      label: 'ADPList (mentorship)',
      url: "https://adplist.org/mentors/cristiano-dalbem/"
    },
    {
      label: 'GitHub (coding projects)',
      url: "https://github.com/cmdalbem/"
    },
    // {
    //   label: 'Dribbble',
    //   url: "https://dribbble.com/cmdalbem/"
    // },
    {
      label: 'Goodreads (what I\'m reading)',
      url: "https://www.goodreads.com/cmdalbem"
    },
    {
      label: 'Letterboxd (what I\'m watching)',
      url: "https://letterboxd.com/cmdalbem/"
    }
  ];

  return (
    <LinksList items={items}/>
  )
}

export default Social