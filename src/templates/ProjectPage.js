import React from 'react'
import Helmet from 'react-helmet'

import { Link,graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';
import { isFunctionOrClass } from '../components/reveal-ssr-helper';

import { BrowserView } from 'react-device-detect';

// Fallback components for SSR when react-reveal is not available
const RevealOrDiv = isFunctionOrClass(Reveal) ? Reveal : (({ children }) => <div>{children}</div>);
const FadeOrDiv = isFunctionOrClass(Fade) ? Fade : (({ children }) => <div>{children}</div>);

import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import ReadingProgressBar from '../components/ReadingProgressBar'

import { markdownRenderer }  from '../components/markdownComponents'
import { formatDate, capitalize, ROLE_ICONS, ROLES_MAP } from '../components/utils.js'

import ContentNav from '../components/ContentNav'
 
// import { RightArrow, LeftArrow } from '../components/icons.js'

const HOW_MANY_YEARS_OLD_IS_TOO_OLD = 4;


class ProjectPage extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext
    const { readingTime } = post.fields; 

    const baseType = 'f4-ns f5 dark-gray lh-copy ';
    const defaultMargins = "w-60-l mw8-l center";

    let dateStart = formatDate(post.frontmatter.date, 'MMMM YYYY');
    let dateEnd = formatDate(post.frontmatter.date2, 'MMMM YYYY');
    if (dateEnd && dateEnd === dateStart) {
      dateEnd = null;
    }

    let lastUpdated;
    if (post.frontmatter.lastUpdated) {
      lastUpdated = formatDate(post.frontmatter.lastUpdated, 'MMMM YYYY')
    }

    const yearsOld = new Date().getFullYear() - new Date(post.frontmatter.date2).getFullYear();
    const isOldProject = yearsOld > HOW_MANY_YEARS_OLD_IS_TOO_OLD;

    const headings = post.htmlAst.children
      .filter(c => c.tagName === 'h1' || c.tagName === 'h2')
      .map(h => ({tag: h.tagName, title: h.children[0].value})); 

    return (
      <Layout location={this.props.location}>
        <Helmet>
          <html lang="en"/>
          {/* <link rel="stylesheet" href="https://unpkg.com/tachyons@4/css/tachyons.min.css"/> */}

          <title>{post.frontmatter.title}</title>

          <meta property="og:title" content={post.frontmatter.title}/>
          <meta property="og:description" content={post.frontmatter.description}/>
          <meta property="og:image" content={'https://www.cristianodalbem.com' + post.frontmatter.cover.childImageSharp.resize.src}/>
          <meta property="og:url" content={'https://www.cristianodalbem.com' + post.fields.slug}/>
          <meta property="og:type" content="website"/>

          <meta name="twitter:card" content="summary_large_image"/>
          <meta name="twitter:title" content={post.frontmatter.title}/>
          <meta name="twitter:description" content={post.frontmatter.minibio}/>
        </Helmet>
        
        <BrowserView>
          <ReadingProgressBar barColor={post.frontmatter.color}/>
        </BrowserView>
        
        <div className="center">
          {/* Heading */}
          <FadeOrDiv duration={2000} >
            <div className="flex flex-column mv5-ns mv4">
              <div className="flex flex-column mt3 mb5-ns">
                <div className={defaultMargins}>
                  <h1 className={`f-subheadline-ns f mt5-ns mt0 fw5 mb3 lh-solid tracked-tight ${post.frontmatter.color ? '' : 'dark-gray'}`} style={{color: post.frontmatter.color}}>
                    {post.frontmatter.title}
                  </h1>
                  
                  {
                    post.frontmatter.description &&
                    <div className="mb3 f3-ns f4 dark-gray lh-copy">
                      {post.frontmatter.description}
                    </div>
                  }
                  <div className='f5 gray db-ns dn'>
                    {
                      readingTime.minutes > 1 &&
                      readingTime.text
                    }

                    {
                      post.frontmatter.lastUpdated &&
                      <div className='di'>
                        {
                          readingTime.minutes > 1 &&
                          post.frontmatter.lastUpdated &&
                            <span className='ph1'> · </span>
                        }
                        <span>Last updated on {lastUpdated}</span>
                      </div>
                    }
                  </div>

                  {
                    post.frontmatter.liveLink &&
                    // <div className="gradient-border--animated dim ">
                    //   <a
                    //     href={post.frontmatter.liveLink} target="_blank" rel="noopener noreferrer"
                    //     className="text-gradient-clip bg-gradient--animated dib f5 fw6 link orange pv3 ph5"
                    //   >
                    //     See it live
                    //   </a>
                    // </div>
                    <a
                      href={post.frontmatter.liveLink} target="_blank" rel="noopener noreferrer"
                      className="dib mt5-ns mb4-ns mv2 f5 fw6 link pv3 ph4 ba dim br-pill b--orange"
                      style={{ 
                          // backgroundColor: post.frontmatter.color,
                          borderColor: post.frontmatter.color,
                          color: post.frontmatter.color
                      }}>
                      See it live
                    </a>
                  }
                </div>
              </div>
            </div>
          </FadeOrDiv>

          {/* Cover image */}
          <div className="flex flex-row-ns flex-column relative z-2">
            <div className="w-100">
              <RevealOrDiv effect="clipIn" duration={2000}>
                {
                  post.frontmatter.cover ?
                    <GatsbyImage image={getImage(post.frontmatter.cover)} alt="" />
                    :
                    <div className="w-100 h5 pv7 bg-silver"></div>
                }
              </RevealOrDiv>
            </div>
          </div>
        </div>

        <ContentNav sections={headings} />

        <div className={"flex flex-row-ns flex-column mv5 " + defaultMargins}>
          {/* {
            <div className='mv4 dark-gray'>
              <h2 className="f5 mv2 fw4 gray">
                Challenge
              </h2>
              <span className="f5 din lh-copy">
                {post.frontmatter.minibio}
              </span>
            </div>
          } */}

          {
            <div className="dark-gray w-100 mr2 mv0-ns mv2">
              <h2 className="f5 fw4 gray">
                Timeline
              </h2>
              <div className="f5 lh-copy">
                {dateStart}
                {dateEnd &&
                  ` – ${dateEnd}`
                }
              </div>
              {
                isOldProject &&
                <div className="f6 orange mt2">
                  {yearsOld} years ago, take with a grain of salt :)
                </div>
              }
            </div>
          }

          {
            post.frontmatter.tags &&
            post.frontmatter.tags.length > 0 &&
            <div className="dark-gray w-100 mr2 mv0-ns mv2">
              <h2 className="f5 fw4 gray">
                Roles
              </h2>
              <div className='f5 lh-copy'>
                { 
                  post.frontmatter.tags.map(function(t) {
                    t = capitalize(t);
                    t = ROLES_MAP[t] || t;
                    return (
                      <div className="mb2 flex items-center" key={t}>
                        {ROLE_ICONS[t]} <span className='mr1'></span> {t}
                      </div>
                    )
                  })
                }
                {/* { post.frontmatter.tags.map(t => capitalize(t)).join('・') } */}
                {/* {post.frontmatter.tags.map(t => (
                  <Tag size="big" key={t}>
                    {capitalize(t)}
                  </Tag>
                ))} */}
              </div>
            </div>
          }

          {
            post.frontmatter.team &&
            <div className='dark-gray w-100 mr2 mv0-ns mv2'>
              <h2 className="f5 fw4 gray">
                Teammates
              </h2>
              <span className="f5 lh-copy">
                {/* {post.frontmatter.team} */}
                {
                  post.frontmatter.team.map(t => ( 
                    <div className="mb2" key={t}> {t} </div>
                  ))
                } 
              </span>
            </div>
          }

          {
            post.frontmatter.metrics &&
            post.frontmatter.metrics.length > 0 &&
            <div className="dark-gray w-100">
              <h2 className="f5 fw4 gray">
                Metrics
              </h2>
              <div className="f5 lh-copy">
                { 
                  // post.frontmatter.metrics.map(t => capitalize(t)).join('・')
                  post.frontmatter.metrics.map(t => (
                    <div className="mb2" key={t}> {capitalize(t)} </div>
                  ))
                }
              </div>
            </div>
          } 

          
        </div>

        {/* Content */}
        <div className="flex flex-column center relative">
          <div className={baseType}>
            { markdownRenderer(post.frontmatter.fullWidth)(post.htmlAst) }
          </div>
        </div> 

      {/* Other projects */}
      <div className="flex flex-column bg-near-white mt6 nl6-ns nr6-ns nl3 nr3 ph6-ns ph3 pb6 relative z-2">
          {
            (previous || next) &&
            <div className="w-100 tc f2 mv6">
              <h2 className="f1 fw4 dark-gray">Other projects</h2>
            </div>
          }

          <div className="flex flex-row-ns flex-column justify-between mt4">
            <div className="w-40-ns w-100">
              {
                previous && 
                <div>
                  {/* <div className="f6 tl mb1 fw7 ttu black-20 db-ns dn">
                    Previous
                  </div> */}
                  <ProjectCard node={previous} />
                </div>
              }
            </div> 

            <div className="w-10-ns mv0-ns mv3"></div>

            <div className="w-40-ns w-100">
              {
                next &&
                <div>
                  {/* <div className="f6 tl mb1 fw7 ttu black-20 db-ns dn">
                    Next
                  </div> */}
                  <ProjectCard node={next} />
                </div>
              }
            </div>
          </div>

          <div className="w-100 tc mt6">
            <Link to="/#projects" className="dim f4 fw5 link ph4 pv3 br2 orange br-pill ba b--orange">
              View all projects
            </Link>
          </div>
        </div>

      </Layout> 
    )
  }
}

export default ProjectPage

export const pageQuery = graphql`
         query BlogPostBySlug($slug: String!) {
           markdownRemark(fields: { slug: { eq: $slug } }) {
             id
             excerpt
             htmlAst
             frontmatter {
               title
               description
               minibio
               date
               date2
               lastUpdated
               liveLink
               tags
               metrics
               team
               color
               cover {
                  childImageSharp {
                    gatsbyImageData(
                      width: 2280
                      placeholder: BLURRED
                      formats: [AUTO, WEBP, AVIF]
                    )
                    resize(width: 1200) {
                      src
                    }
                  }
                }
             }
             fields {
               slug
               readingTime {
                 text
                 minutes
               }
             }
           }
         }
       `