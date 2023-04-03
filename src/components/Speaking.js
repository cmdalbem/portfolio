import React from 'react'

import Reveal from 'react-reveal/Reveal';

const Speaking = () => (
  <Reveal effect="slideUp">
      <Talk
        title="🇺🇸 Workshop: Better Data for Better Bicycle Lanes"
        context="ITDP webinar, 2023"
        link="https://youtu.be/lChW-QSTwq0?t=361"
        linkLabel="video"
      />

      <Talk
        title="🇺🇸 CicloMapa: a web platform to democratize access to bike maps with OpenStreetMap."
        context="Free and Open Source Software for Geospatial (FOSS4G) 2021 Conference"
        link="https://docs.google.com/presentation/d/1eODEkmsWUezqNhqL5UqS1Vcc6yH9XXGnZ1N--ejfxfQ/edit?usp=sharing"
        linkLabel="slides"
      />

      <Talk
        title="🇧🇷 Prototypes (or: A Presentation About Prototypes Made As A Prototype)."
        context="Laboratory of Creative Practices in Software - UFRGS, Specialization in Software Engineering and Innovation, 2020"
        link="https://www.figma.com/proto/wzuas1ACN5n2t9lVyPtnj8/Apresenta%C3%A7%C3%A3o-Prot%C3%B3tipos?node-id=1%3A89&scaling=min-zoom"
        linkLabel="slides"
      />

      <Talk
        title="🇧🇷 The 3 Pillars for Scaling Design at VTEX"
        context="Design at Scale Meetup - Rio de Janeiro & Recife, 2019"
        link="https://www.youtube.com/watch?v=43S4BThGopU"
        linkLabel="video"
      />

      <Talk
        title="🇧🇷 Generating insights from data in complex B2B products"
        context="TheDevelopersConference - Product Management Track. São Paulo 
        & Recife, 2019"
        link="https://docs.google.com/presentation/d/1xDkUiYvJFdY7QShe36kS9pauHzZJhRYnTLz0LNtZ2EY/edit?usp=sharing"
        linkLabel="slides"
      />

      <Talk
        title="🇧🇷 A new experience to create and manage promotions on VTEX"
        context="VTEX Day - São Paulo, 2019"
        link="https://docs.google.com/presentation/d/1eXlEMlTrrYifJIOIWkdEAiz_Pxo0iHnuXr_NhLsjQto/edit?usp=sharing"
        linkLabel="slides"
      />

      <Talk
        title="🇧🇷 The UX of Urban Mobility - Better Cities to Ride and Live"
        context="Interaction Latin America - Rio de Janeiro, 2018"
        link="https://docs.google.com/presentation/d/1wYfnc6qrscQ26ndJRMlrk82xW-tqHEZpuK_kVjXSofs/edit?usp=sharing"
        linkLabel="slides"
      />

      {/* <Talk
        title="Rage, rage against the dying of the Design System - Morte e vida de um sistema para empoderar um ecossistema."
        context="Interaction Latin America, 2018 [proposal]"
        link="https://drive.google.com/open?id=10VxokY3c1onxm67WUD_flPh5tlxyydBy"
      /> */}

      <Talk
        title='🇧🇷 Is it possible to park the bike "de boa"?'
        context="Bicicultura - Rio de Janeiro, 2018"
        link="https://docs.google.com/presentation/d/1JJvtK1kPmfCg-g06vtmPoQNBgT9BdHZQCGxbXaqZAm8/edit#slide=id.p"
        linkLabel="slides"
      />

      {/* <Talk
        title="Podcasts"
        context="Isobar Lightning Talks - Porto Alegre, 2017"
        link="https://docs.google.com/presentation/d/1hzKk7USBEVX9m8HlrZD5rRb8sp-VXWFYuyebHe5kzJ8/edit?usp=sharing"
      /> */}

      <Talk
        title="🇧🇷 Free Multimedia"
        context="Fórum Internacional Software Livre - Porto Alegre, 2016"
        link="https://musica-libre.org/sprint_multimedia_2016_1"
        linkLabel="website"
      />

      <Talk
        title="🇧🇷 The first PWA web app for cyclists"
        context="Google IO Extended - Porto Alegre, 2015"
        link="https://docs.google.com/presentation/d/18DyziybC2Benf43OMAd5T7611QULd9oWA1L60rzvrsM/edit#slide=id.p"
        linkLabel="slides"
      />

      <Talk
        title="🇧🇷 React in the Real World - Reports from the world's largest car rental website"
        context="React Meetup - Porto Alegre, 2014"
        link="https://docs.google.com/presentation/d/1RnbQ5beTuvtUFzk6KX3kJXrF25i2WN-ZMcXbhlelktw/edit#slide=id.p"
        linkLabel="slides"
      />

      {/* <Talk
        title="Slow TV"
        context="Isobar Lightning Talks, 2016"
        link="https://www.youtube.com/playlist?list=PLEQfAlS3xFFXkBT0lAzsiHvX1OKuH1qv5"
      />

      <Talk
        title="Fallacies"
        context="Isobar Lightning Talks, 2016"
        link="https://docs.google.com/presentation/d/1989zLiju0njGpa4oTJz3J80kEIODHYTTTfmP6UYX35M/edit#slide=id.p"
      /> */}

      {/* <Talk
        title="O que aprendi com as Artes Marciais"
        context="Desconferência UFRGS - Porto Alegre, 2013"
        link="https://docs.google.com/presentation/d/1djDV4rN1B3gyP-ODDjxwNMGlvgfExUyxe47l8n7tI_w/edit#slide=id.p"
      /> */}
    </Reveal>
)

class Talk extends React.Component {
  state = {
    hover: false
  }

  render() {
    const { title, context, link, linkLabel } = this.props;

    return (
      <a
        className={`link dark-gray animatable db pv4-ns pv3 relative lh-copy bb b--light-gray flex justify-between ${this.state.hover ? '' : ''}`}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})}
      >
        <div className="">
          <div className={`fw6 mv1 ${this.state.hover ? 'orange' : ''}`}>
            {title}
          </div>
          
          <div className="gray f5">
            {context}
          </div>
          
          {/* <div className="mv2">
            <a className="pretty-link" href={link}>
            Slides
            </a>
          </div> */}
        </div>

        <div className={`mt1 absolute top-0 right-0 bg-white ph2 ${this.state.hover ? 'o-100' : 'o-0'}`}>
          View {linkLabel} ↗
        </div>
      </a>
    )
  }
}

export default Speaking