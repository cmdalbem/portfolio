import React from 'react'
import { graphql } from 'gatsby'

// import ScrollReveal from 'scrollreveal'

import Layout from '../components/Layout'
 
// import AnimateLoad from '../components/AnimateLoad'
import Speaking from '../components/Speaking'
import Reading from '../components/Reading'
import Social from '../components/Social'
import HomeSection from '../components/HomeSection'
import Projects from '../components/Projects'

import selfie from '../images/selfie.png' 

import { sortPosts } from '../components/utils.js'

class IndexPage extends React.Component {
  // componentDidMount() {
  //   if (typeof window !== `undefined`) {
  //     window.sr = ScrollReveal({
  //       reset: false,
  //       // scale: 1, 
  //       // mobile: true,
  //       // viewFactor: 0.3,
  //       // delay: 200,
  //       opacity: 0.2,
  //       duration: 700,
  //       distance: '20px',
  //       easing: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
  //     }); 
      
  //     // window.sr.reveal('section', { duration: 700}, 3000); 
  //     // window.sr.reveal('section, .project-card');
  //     window.sr.reveal('.animatable');
  //   }
  // }

  render() {
    const posts = sortPosts(this.props.data.allMarkdownRemark.edges);
    const caseStudies = posts.filter(i => i.node.frontmatter.projectType === 'case study');
    const projects = posts.filter(i => i.node.frontmatter.projectType === 'project');
    
    let bookNodes = {};
    bookNodes.finished = this.props.data.allGoodreadsBook.edges.filter( b =>
      b.node.shelfNames.includes('read')
    );
    bookNodes.reading = this.props.data.allGoodreadsBook.edges.filter( b =>
      b.node.shelfNames.includes('currently-reading')
    );
    
    return (
      <Layout>
        <div className="mw9 center">
          <section className="flex flex-row-ns flex-column ">
            <div className="w-40-ns">
              <img
                src={selfie}
                alt="Silhouette of a man standing at the top of a hill with silhouettes of mountains in the background. I like mountains because they offer great insights about life in general. Like: we're never quite sure of how tall are the mountains just over the ones that are nearest to us, all we have to do is keep climbing and taking care of our own pair of legs."
                className="parallax__layer--back absolute top-3-ns top-2 mt0-ns mt5 w-80 w-100-ns relative-ns"
              />

              <h1 
                className="f-subheadline-ns f1 fw4 dark-gray absolute lh-solid top-0 left-3-ns pt5-ns mt6-ns ml7-ns ml4 mt6 mr3 tl-ns tr"
                style={{maxWidth: 650}}>
                I'm a designer of products and systems.
              </h1>
            </div> 

            <div className="w-10-ns" />

            <div className="w-50-ns mt7">
              <section id="about" className="mb4 mt6-ns mt7 pt4 f4 lh-copy dark-gray">
                <p>
                  Nice to meet you!
                </p>
                <p>
                  I'm a designer with a skill set ranging from researching to designing and programming products and systems. I'm interested in solving problems related to the human experience of technology and tools we use to work and express ourselves.
                </p>
                <p>
                  My background in Computer Science has biased me towards solutions that are scalable, maintainable and that stand the test of time. This mindset also applies to businesses and their role in the society. I work with purpose, and I like creating stuff that contribute to a more sustainable and equitable world.
                </p>
                <p>
                  I'm very curious and I'm always learning different stuff. I find it helps me stay creative, and give me knowledge to find the right problems to solve, as well as the right solutions for them.
                </p>
              </section>
            </div>
          </section>

          <HomeSection title="Work">
            <div className="f4 pb4-ns pb2 mt2 dark-gray lh-copy">
              I'm working as a <b>Product Designer</b> at{' '}
                <a
                  className="pretty-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.vtex.com/"
                >
                  VTEX
                  </a>
                , building the future of e-commerce in one of the biggest ecosystems in
                the world. I've been contributing in a variety of teams and projects, participating from all project phases, always in search of the right balance between the inherent complexity of the platform, technology constraints and the pains and needs of thousands of users that depend on our platform everyday to run their businesses.
              <p>
                In my free time I'm a <b>cicloactivist</b> and I try to apply my skills to improve urban mobility and ultimately contribute for better cities. I've built{' '}
                <a className="pretty-link" target="_blank" rel="noopener noreferrer" href="https://www.bikedeboa.com.br/" > bike de boa</a> and <a className="pretty-link" target="_blank" rel="noopener noreferrer" href="https://ciclomapa.org.br/" > CicloMapa</a>
                , two web apps to help urban cyclists in Brazil.
              </p>
            </div>
          </HomeSection>

          <HomeSection title="Case studies" fullScreen
            description="Here's a selection of projects in which I've played a major role and I'm very proud of.">
            <Projects posts={caseStudies}/> 
            <Projects mini posts={projects} /> 
          </HomeSection> 
          
          <HomeSection
            title="Speaking"
            description="I try to be as engaged as possible with the community, always learning from others and  trying to share some ideas too."
          > 
            <Speaking />
          </HomeSection>

          <HomeSection 
            title="Reading"
            description={(
              <span> 
                Reading good books is like always having good companies and being mentored by the best. This is what I'm currently reading, according to 
                <a
                  className="pretty-link ml1"
                  href="https://www.goodreads.com/cmdalbem"
                  target="_blank"
                  rel="noopener noreferrer">
                  Goodreads
                </a>.
              </span>
            )}
          >
            <Reading bookNodes={bookNodes} />
          </HomeSection>

          <HomeSection title="Social">
            <Social />
          </HomeSection>
        </div>

      </Layout>
    );
  } 
}

export default IndexPage;
// export default AnimateLoad(IndexPage);

export const pageQuery = graphql`
         query {
           allGoodreadsBook(filter: {shelfNames: {in: ["read","currently-reading"]}}) {
            edges {
              node {
                shelfNames
                book {
                  link
                  title
                  imageUrl
                  authors {
                    name
                  }
                }
              }
            }
          },
           allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
             edges {
               node {
                 excerpt
                 fields {
                   slug
                 }
                 frontmatter {
                   date
                   date2
                   title
                   description
                   minibio
                   projectType
                   tags
                   cover {
                     publicURL
                   }
                   forceOrder
                 }
               }
             }
           }
         }
       `