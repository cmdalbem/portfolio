import React from 'react'
import Helmet from 'react-helmet'

import { Link,graphql } from 'gatsby'
import Img from "gatsby-image"

import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';

import { BrowserView } from 'react-device-detect';

import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import ReadingProgressBar from '../components/ReadingProgressBar'

import { markdownRenderer }  from '../components/markdownComponents'
import { formatDate, capitalize } from '../components/utils.js'

import ContentNav from '../components/ContentNav'
 
// import { RightArrow, LeftArrow } from '../components/icons.js'

const HOW_MANY_YEARS_OLD_IS_TOO_OLD = 4;

const ROLES_MAP = {
  'Design': 'Designer',
  'Product Design': 'Designer',
  'Product Management': 'Product Manager',
  'Research': 'Researcher',
  'UX Research': 'Researcher',
  'Front-end': 'Developer',
  'Web Development': 'Developer',
}
const ROLE_ICONS = {
  'Designer': <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pen-tool"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
  
  'Product Manager': <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-compass"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  
  'Researcher': <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-zoom-in"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  
  'Entrepreneur': <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  
  'Developer': <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
  
  'Branding': <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
}

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
          <link rel="stylesheet" href="https://unpkg.com/tachyons@4/css/tachyons.min.css"/>

          <title>{post.frontmatter.title}</title>

          <meta property="og:title" content={post.frontmatter.title}/>
          <meta property="og:description" content={post.frontmatter.description}/>
          <meta property="og:image" content={'https://www.cristianodalbem.com' + post.frontmatter.cover.childImageSharp.fluid.src}/>
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
          <Fade duration={2000} >
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
          </Fade>

          {/* Cover image */}
          <div className="flex flex-row-ns flex-column relative z-2">
            <div className="w-100">
              <Reveal effect="clipIn" duration={2000}>
                {
                  post.frontmatter.cover ?
                    <Img fluid={post.frontmatter.cover.childImageSharp.fluid} alt="" />
                    :
                    <div className="w-100 h5 pv7 bg-silver"></div>
                }
              </Reveal>
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
                  ({yearsOld} years old project, take with a grain of salt :)
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
               fullWidth
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