import React from 'react'

import LinksList from './LinksList'

const Social = () => {
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
      label: "CV",
      url: "/cv-feb25.pdf",
      description: "Updated Feb'25"
    },
    {
      label: "ADPList",
      url: "https://adplist.org/mentors/cristiano-dalbem/",
      description: "Free design mentorship"
    },
    {
      label: "GitHub",
      url: "https://github.com/cmdalbem/",
      description: "Coding projects"
    },
    {
      label: "Goodreads",
      url: "https://www.goodreads.com/cmdalbem",
      description: "Books I'm reading"
    },
    {
      label: "Letterboxd",
      url: "https://letterboxd.com/cmdalbem/",
      description: "Movies I've watched"
    }
  ];

  return (
    <LinksList items={items}/>
  )
}

export default Social