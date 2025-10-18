import React from 'react'

import LinksList from './LinksList'

const Links = () => {
  const items = [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/cmdalbem/"
    },
    {
      label: "Email",
      url: "mailto:cristiano.dalbem@gmail.com"
    },
    {
        label: "Mentorship",
        url: "https://adplist.org/mentors/cristiano-dalbem/",
        // description: "Mentorship"
    },
    {
        label: "GitHub",
        url: "https://github.com/cmdalbem/",
        // description: "Code"
    },
    {
      label: "CV",
      url: "/cv-oct25.pdf",
      description: "Last updated: October/25"
    },
    // {
    //   label: "Goodreads",
    //   url: "https://www.goodreads.com/cmdalbem",
    //   description: "Books I'm reading"
    // },
    // {
    //   label: "Letterboxd",
    //   url: "https://letterboxd.com/cmdalbem/",
    //   description: "Movies I've watched"
    // }
  ];

  return (
    <LinksList items={items}/>
  )
}

export default Links
