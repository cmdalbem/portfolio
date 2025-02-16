import React from 'react'
import { graphql } from 'gatsby'
import Img from "gatsby-image"

import Reveal from 'react-reveal/Reveal';
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
  const {rows, typography} = props;
  
  return (
    <>
      {
        rows.map((r,i) =>
          <div className="overflow-hidden">
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
                className="profilePicture top-0-ns right-0-ns h-100-ns h-75 mt0-ns mt6 w-100 w-50-ns"
                fluid={this.props.data.file.childImageSharp.fluid}
                alt="Back of a man walking through a hiking path with silhouettes of mountains in the background. I like mountains because they offer great insights about life in general. Like: we're never quite sure of how tall are the mountains just over the ones that are nearest to us, all we have to do is keep climbing and taking care of our own pair of legs."
              />

              <div className="absolute top-0 mt7-ns mt2">
                {
                  isMobile ?
                    <h1 className={titleTypography}>
                      I’m a self-taught designer with over 8 years of experience designing and building impactful digital products.
                    </h1>
                  : <AnimatedHeader
                      typography={titleTypography} 
                      rows={[
                        'I’m a self-taught designer with over',
                        '8 years of designing and building', 
                        'impactful digital products.'
                  ]}/> 
                }
              </div>
            </div> 
          </section>

{/*           
          <HomeSection title="About" fullScreen>
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
                    'designing elegant, sustainable, strategic, and user-', 
                    'centric solutions across interfaces, products,',
                    'systems, and platforms. I\'m also a builder, eager to roll',
                    'up my sleeves to bring ideas to life.',
              ]}/> 
          </HomeSection> */}

          <HomeSection title="About me" fullScreen> 
            <div className="f2-ns f4 lh-copy fw4 dark-gray measure">
              <Reveal effect="slideUp" duration={2000} big>
                  <p className="text-gradient-clip">
                    With the projects I delivered, I impacted the lives of millions of people by <span className='ttext'>simplifying</span> their financial lives, <span className='ttext'>streamlining efficient and humane</span> customer support, <span className='ttext'>launching and scaling</span> some of Brazil's largest online brands, and fostering urban cycling <span className='ttext'>making our cities more livable and sustainable</span>.
                  </p>
              </Reveal>
               <Reveal effect="slideUp" duration={2000} big>
                  <p className="text-gradient-clip">
                    I'm passionate about solving complex problems by designing <span className='ttext'>user-centric, elegant and strategic</span> solutions across interfaces, products, systems, and platforms. More than a designer, I'm a builder—eager to get <span className='ttext'> hands-on with code</span> to bring ideas to life.
                  </p>
              </Reveal>
            </div>
          </HomeSection>

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

          <HomeSection title="Projects" fullScreen
            description="The stories behind some professional projects in which I've played a major role and I'm very proud of.">
            <Projects posts={projectsHighlights}/> 
            <Projects mini posts={projects} />
          </HomeSection>

          <HomeSection title="Sideprojects" fullScreen
            description="Things I built to help solve people's problems, learn something new, or just for fun.">
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
                   description
                   minibio
                   projectType
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