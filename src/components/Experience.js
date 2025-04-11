import React from 'react'

import Reveal from 'react-reveal/Reveal';

const Speaking = () => (
  <Reveal effect="slideUp">
    <div className="bg-black-10" style={{
        height: '100%',
        width: 1,
        position: 'absolute',
        marginLeft: 16
    }}/>
    
    <Talk
      title="Revolut"
      context="Senior Product Designer"
      // desc="Lead designer for Revolut-branded ATMs launching in Spain (2025). Part-time designer in the CX team, building internal web products to enhance customer support efficiency."
      date="Jun 2024"
      current={true}
      link="https://www.revolut.com/"
      logo="https://media.licdn.com/dms/image/v2/D4E0BAQFBudSGoYdD9g/company-logo_100_100/company-logo_100_100/0/1736441557682/revolut_logo?e=1749081600&v=beta&t=5wKaxd-27DXMdfjJUYo_n1JJrBfD3fG8OnigREyl7j8"
    />

    <Talk
      title="Nubank"
      context="Senior Product Designer"
      // context="Led UX research and product design for multiple financial products. Specialized in UX strategy, prototyping, and mobile experience design."
      date="May 2020 – Jun 2024 (4 yrs 2 mos)"
      link="https://www.nubank.com.br/"
      logo="https://media.licdn.com/dms/image/v2/C4D0BAQE2EnQJeawjAA/company-logo_100_100/company-logo_100_100/0/1657129831483/nubank_logo?e=1749081600&v=beta&t=8q6Tb5JUcw6MHjyG-QUPW1jqU8KTk0C6e7MUuK2_IR8"
    />

    <Talk
      title="Meu Corre"
      context="Co-Founder, Product Manager & Designer"
      // context="Built a social impact startup providing financial management tools for Brazilian delivery workers. Funded by Startup Rio and Labora."
      date="Nov 2020 – Jun 2024 (3 yrs 8 mos)"
      link="https://www.meucorre.com.br/"
      logo="https://media.licdn.com/dms/image/v2/D4D0BAQEEP8ds5zjCXQ/company-logo_100_100/company-logo_100_100/0/1712845469755/meu_corre_logo?e=1749081600&v=beta&t=qeuimTUoCk7XMc97I6pzyPzdu_dwE_yWAT7WMCwasOw"
    />

    <Talk
      title="VTEX"
      context="Product Designer"
      // context="Designed UX solutions for one of Latin America’s leading e-commerce platforms, used by thousands of businesses daily."
      date="Oct 2017 – Apr 2020 (2 yrs 7 mos)"
      link="www.vtex.com"
      logo="https://media.licdn.com/dms/image/v2/C4E0BAQGuwANNml02DA/company-logo_100_100/company-logo_100_100/0/1630650735642/vtex_logo?e=1749081600&v=beta&t=tw2FgnTIDuEkvjcRvuaxwXf7oZf4lS1MDky38yYd1HM"
    />

    <Talk
      title="Isobar"
      context="Front-end Developer & UX Designer"
      // context="Worked on UX research and product design for digital experiences in the Porto Alegre area."
      date="May 2015 – Sep 2017 (2 years 5 mos)"
      link="www.isobar.com"
      logo="https://media.licdn.com/dms/image/v2/C4E0BAQHcnqayoU0KQg/company-logo_100_100/company-logo_100_100/0/1630643455196/isobar_logo?e=1749081600&v=beta&t=d7MbiBVsdEVSLoYMg118WTv8zxrUKaEEPJURAQGxchQ"
    />

    <Talk
      title="Klee Group"
      context="Web Developer Intern"
      // context="Internship focused on web development in Paris, France."
      date="Feb 2014 – Aug 2014 (7 mos)"
      link="https://www.kleegroup.com/fr"
      logo="https://media.licdn.com/dms/image/v2/C510BAQF0WdTjRRgs_w/company-logo_100_100/company-logo_100_100/0/1631337949772?e=1749081600&v=beta&t=QkK4FlMEp57X7oKroyfea1Svi1OI3Shw70zKxhJ1H1s"
    />

    <Talk
      title="Microsoft Computer Graphics Research Center"
      context="Research & Development"
      // context="Part of the Computer Graphics Research Group, exploring visualization and simulation technologies."
      date="Aug 2011 – Apr 2013 (1 yr 9 mos)"
      link="http://www.ufrgs.br/"
      logo="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png"
    />

    <Talk
      title="PET Computação UFRGS"
      context="Research & Development"
      // context="Engaged in research projects in computing at UFRGS."
      date="Apr 2009 – Jul 2011 (2 yrs 4 mos)"
      link="https://www.inf.ufrgs.br/site/pet/"
      logo="https://upload.wikimedia.org/wikipedia/commons/e/e9/Logo_UFRGS_formato_SVG-01.svg"
    />
  </Reveal>
)

class Talk extends React.Component {
  state = {
    hover: false
  }

  render() {
    const { title, context, link, date, current, desc } = this.props;
    let dateStr;
    

    if (current) {
      const startDate = new Date(date);
      const currentDate = new Date();
      const monthsDiff = (currentDate.getFullYear() - startDate.getFullYear()) * 12 + (currentDate.getMonth() - startDate.getMonth());
      dateStr = date + ` – Present (${monthsDiff} mos)`;
    } else {
      dateStr = date;
    }

    return (
      <a
        className={`link dark-gray db pv4-ns pv3 relative lh-copy flex justify-between dim`}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {this.props.logo && (
          <img
            src={this.props.logo}
            className="h2 w2 dib mr3 br2 b--light-gray ba"
          />
        )}
        <div className="w-100">
          <div className="f4 lh-title">
            {title}
          </div>
          
          <div className="f6">
              {context}
          </div>
          
          <div className="f6">
              {desc}
          </div> 

          <div className="f6 silver">
              {dateStr}
          </div>
        </div>
      </a>
    )
  }
}

export default Speaking