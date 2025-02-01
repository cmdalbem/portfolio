import React from 'react'
import { graphql } from 'gatsby'
import Img from "gatsby-image"

import Fade from 'react-reveal/Fade';

import { isMobile } from 'react-device-detect';

import Layout from '../components/Layout'
 
import Speaking from '../components/Speaking'
import Reading from '../components/Reading'
import Social from '../components/Social'
import HomeSection from '../components/HomeSection'
import Projects from '../components/Projects'

import { sortPosts } from '../components/utils.js'

function AnimatedHeader(props) {
  const {rows} = props;
  const typography = 'f1-ns f3 fw4 dark-gray mw7 tracked-tight ma0';
  return (
    <div className="absolute top-0 mt7-ns mt4">
      {
        rows.map((r,i) =>
          <div className="overflow-hidden">
            <Fade bottom cascade={!isMobile} duration={800} delay={400*(i+2)}>
              <h1 className={typography}>
                { r }
              </h1>
            </Fade>
          </div>
        )
      }
    </div>
  )
}

class IndexPage extends React.Component {
  render() {
    let posts = sortPosts(this.props.data.allMarkdownRemark.edges);
    posts = posts.filter(p => !p.node.frontmatter.isHidden);
  
    const filterPostsByType = (type) => posts.filter(i => i.node.frontmatter.projectType === type);
    const projectsHighlights = filterPostsByType('projectHighlight');
    const projects = filterPostsByType('project');
    const personalHighlights = filterPostsByType('personalHighlight');
    const personal = filterPostsByType('personal');
 
    return (
      <Layout>
        <div className="layoutMaxWidth center">
          <section id="about" className="flex flex-row-ns flex-column ">
            {/* <div className="w-40-ns"> */}
            <div className="relative vh-75 w-100">
              <Img
                style={{position: 'absolute'}}
                className="profilePicture top-0-ns right-0-ns h-100-ns h-75 mt0-ns mt6 w-100 w-50-ns"
                fluid={this.props.data.file.childImageSharp.fluid}
                alt="Silhouette of a man standing at the top of a hill with silhouettes of mountains in the background. I like mountains because they offer great insights about life in general. Like: we're never quite sure of how tall are the mountains just over the ones that are nearest to us, all we have to do is keep climbing and taking care of our own pair of legs."
              />

              <AnimatedHeader rows={[
                'I’m a designer bridging the gap',
                'between Product & Systems',
                'Design with a purpose to improve',
                'how technology empowers people.'
              ]}/>
            </div> 

            {/* <div className="w-20-ns" />

            <div className="w-40-ns mt7-ns">
              <section id="about" className="mb4 mt6-ns mt4 pt4 f5 lh-copy dark-gray mw6">
                <Fade duration={1500} delay={800}> 
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
                </Fade>
              </section>
            </div> */}

          </section>

          {/* <HomeSection title="Work">
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
          </HomeSection> */}

          <HomeSection title="Case studies" fullScreen
            description="Here's a selection of professional projects in which I've played a major role and I'm very proud of.">
            <Projects posts={projectsHighlights}/> 
            <Projects mini posts={projects} />
          </HomeSection>

          <HomeSection title="Personal projects" fullScreen
            description="Things I built to help solve people's problems, practice new skills, or just for fun :)">
            <Projects posts={personalHighlights} />
            <Projects mini posts={personal} />
          </HomeSection> 
          
          <HomeSection
            title="Speaking"
            // description="I try to engage with the community as much as possible, always learning from others and sometimes trying to share some ideas too."
          > 
            <Speaking />
          </HomeSection>

          {/* <HomeSection 
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
          </HomeSection> */}

          <HomeSection
            title="Social"
            // description="Other places on the web where you can find me."
          >
            <Social />
          </HomeSection>
        </div>

      </Layout>
    );
  } 
}

export default IndexPage;

export const pageQuery = graphql`
         query {
           file(relativePath: {regex: "\/.*selfie.png\/"}) {
            childImageSharp {
              # Specify the image processing specifications right in the query.
              fluid {
                src
                srcSet
                base64
                aspectRatio
                originalImg
                sizes  
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
                   isHidden
                   isPasswordProtected
                   description
                   minibio
                   projectType
                   tags
                   forceOrder
                   hover
                   color
                   cover { 
                      childImageSharp {
                        fluid(maxWidth: 1248) {
                          src
                          srcSet
                          base64
                          aspectRatio
                          originalImg
                          sizes  
                        }
                      }
                    }
                 }
               }
             }
           }
         }
       `