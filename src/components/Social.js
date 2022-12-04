import React from 'react'

import LinksList from './LinksList'

const Social = () => {
  const items = [
    {
      label: 'LinkedIn',
      url: "https://www.linkedin.com/in/cmdalbem/"
    },
    {
      label: 'GitHub',
      url: "https://github.com/cmdalbem/"
    },
    {
      label: 'ADPList',
      url: "https://adplist.org/mentors/cristiano-dalbem/"
    },
    {
      label: 'Dribbble',
      url: "https://dribbble.com/cmdalbem/"
    },
    {
      label: 'Email',
      url: "mailto:cristiano.dalbem@gmail.com"
    },
    // {
    //   label: 'Goodreads (books)',
    //   url: "https://www.goodreads.com/cmdalbem"
    // },
    // {
    //   label: 'Letterboxd (movies)',
    //   url: "https://letterboxd.com/cmdalbem/"
    // }
  ];

  return (
    <LinksList items={items}/>
  )
}

export default Social