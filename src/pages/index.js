import React from 'react'
import { graphql } from 'gatsby'
import Img from "gatsby-image"

import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';

import { isMobile } from 'react-device-detect';

import Layout from '../components/Layout'
 
import Speaking from '../components/Speaking'
// import Reading from '../components/Reading'
import Experience from '../components/Experience'
import Social from '../components/Social'
import HomeSection from '../components/HomeSection'
import Projects from '../components/Projects'

import { sortPosts } from '../components/utils.js'

function AnimatedHeader(props) {
  const {rows, typography} = props;
  
  return (
    <>
      {
        rows.map((r,i) =>
          <div className="overflow-hidden" key={i}>
            <Fade bottom cascade={!isMobile} duration={900} delay={400*i}>
              <h1 className={typography}>
                { r }
              </h1>
            </Fade>
          </div>
        )
      }
    </>
  );
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

    const titleTypography = 'f1-ns f2 fw4 dark-gray tracked-tight ma0';
 
    return (
      <Layout>
        <div className="layoutMaxWidth center">
          <section id="about" className="flex flex-row-ns flex-column ">
            {/* <div className="w-40-ns"> */}
            <div className="relative vh-75 w-100">
              <Img
                style={{position: 'absolute'}}
                className="profilePicture top-0-ns right-0-ns h-100-ns h-75 mt0-ns mt6 w-100 w-40-ns"
                fluid={this.props.data.file.childImageSharp.fluid}
                alt="Back of a man walking through a hiking path with silhouettes of mountains in the background. I like mountains because they offer great insights about life in general. Like: we're never quite sure of how tall are the mountains just over the ones that are nearest to us, all we have to do is keep climbing and taking care of our own pair of legs."
              />

              <div className="absolute top-0 mt7-ns mt2">
                {
                  isMobile ?
                    <h1 className={titleTypography}>
                      Trained in code, self-taught in, design. For 10 years building impactful, 
                        digital products for work and for love.
                    </h1>
                  : <AnimatedHeader
                      typography={titleTypography} 
                      rows={[
                        'Trained in code & self-taught in',
                        'design, for 10 years building impactful', 
                        'digital products for work and for love.'
                  ]}/> 
                }
              </div>
            </div> 
          </section>

          
          {/* <HomeSection title="About" fullScreen>
              <AnimatedHeader
                  typography="f2-ns f3 lh-copy fw4 dark-gray mv0"
                  rows={[
                    'With the projects I delivered, I impacted the lives of',
                    'millions of people by simplifying their financial lives,', 
                    'streamlining award-winning customer support,',
                    'scaling some of Brazil\'s largest online stores, and',
                    'promoting active urban mobility that makes our cities',
                    'more livable and sustainable.'
              ]}/> 
              <AnimatedHeader
                  typography="f2-ns f3 lh-copy fw4 dark-gray mv0"
                  rows={[
                    'I\'m passionate about solving complex problems by',
                    'designing and coding elegant, sustainable, strategic, and user-', 
                    'centric solutions across interfaces, products,',
                    'systems, and platforms. I\'m also a builder, eager to roll',
                    'up my sleeves to bring ideas to life.',
              ]}/> 
          </HomeSection> */}

          <HomeSection title="Projects" fullScreen
            description="The stories behind some of the work I've done for businesses and other clients.">
            <Projects posts={projectsHighlights}/> 
            <Projects mini posts={projects} />
          </HomeSection>

          <HomeSection title="Sideprojects" fullScreen
            description="Things I built to help solve people's problems, learn something new, or just for fun.">
            <Projects posts={personalHighlights} />
            <Projects mini posts={personal} />
          </HomeSection> 

          <HomeSection title="About me" fullScreen> 
            <div className="f2-ns f4 lh-title fw4 dark-gray measure">
              <Reveal effect="slideUp" duration={2000} big>
                  <p className="text-gradient-clip">
                    With the products I shipped, I impacted the lives of millions of people by <span className='ttext'>simplifying</span> their financial lives, <span className='ttext'>streamlining efficient and humane</span> customer support, <span className='ttext'>scaling</span> some of Brazil's largest e-commerces, and fostering urban cycling <span className='ttext'>making cities more livable and sustainable</span>.
                  </p>
              </Reveal>
               <Reveal effect="slideUp" duration={2000} big>
                  <p className="text-gradient-clip">
                    I work solving complex problems by <span className='ttext'>coding and designing</span> user-centric, elegant and strategic solutions, from interfaces to systems. More than anything I'm a builder, passionate about <span className='ttext'>making ideas come to life</span>.
                  </p>
              </Reveal>
            </div>
          </HomeSection>
          
          {/* <HomeSection title="Experience">
            <Experience />
          </HomeSection> */}

          <Reveal effect="slideUp" duration={2000} big>
            <img src={'/speaking.png'} alt="" />
          </Reveal>
           
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
            {/* <section style={{ height: 496, boxShadow: "rgba(142, 151, 158, 0.15) 0px 4px 19px 0px", borderRadius: 16, overflow: "hidden", width: "100%", maxWidth: 650 }} > <iframe src="https://adplist.org/widgets/booking?src=cristiano-dalbem" title="" width="100%" height="100%" loading="lazy" style={{ border: 0 }} /> </section> */}
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
                   description
                   minibio
                   projectType
                   isPasswordProtected
                   isHidden
                   tags
                   color
                   cover { 
                      childImageSharp {
                        fluid(maxWidth: 2280) {
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