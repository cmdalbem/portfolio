import React from 'react'
import Helmet from 'react-helmet'

import { Link,graphql } from 'gatsby'
import Img from "gatsby-image"

import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';

import { BrowserView } from 'react-device-detect';

import Tag from '../components/Tag'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import ReadingProgressBar from '../components/ReadingProgressBar'

import { markdownRenderer }  from '../components/markdownComponents'
import { formatDate, capitalize, differenceInYears } from '../components/utils.js'
 
// import { RightArrow, LeftArrow } from '../components/icons.js'

const HOW_MANY_YEARS_OLD_IS_TOO_OLD = 3;


class ProjectPage extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext
    const readingTime = post.fields.readingTime; 

    const baseType = 'f4-ns f5 dark-gray lh-copy ';

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
            <div className="flex flex-column mv5">
              <h1 className={`f-subheadline-ns w-60-ns mt5-ns mt0 fw5 mb3 lh-solid tracked-tight ${post.frontmatter.color ? '' : 'dark-gray'}`} style={{color: post.frontmatter.color}}>
                {post.frontmatter.title}
              </h1>
              <div className="flex flex-row-ns flex-column mt3 mb5">
                <div className="w-50-ns">
                  {
                    post.frontmatter.description &&
                    <div className="mb3 f3-ns f4 dark-gray lh-copy tracked-tight">
                      {post.frontmatter.description}
                    </div>
                  }
                  <div className='f6 silver db-ns dn'>
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
                      className="dib mv4 f5 fw6 link pv3 ph5 ba dim br2"
                      style={{ 
                          // backgroundColor: post.frontmatter.color,
                          borderColor: post.frontmatter.color,
                          color: post.frontmatter.color
                      }}>
                      See it live
                    </a>
                  }
                </div>

                <div className="w-20-ns">
                </div>

                <div className="w-30-ns">
                  {/* {
                    <div className='mv4 dark-gray'>
                      <h2 className="f5 mv2 mr2">
                        <span>
                          Challenge
                        </span>
                      </h2>
                      <span className="f5 din lh-copy">
                        {post.frontmatter.minibio}
                      </span>
                    </div>
                  } */}

                  {
                    <div className="mb4 dark-gray">
                      <h2 className="f5 mv2 mr2">
                        <span>
                          Date
                        </span>
                      </h2>
                      <div className="f5">
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
                    <div className="mv4 dark-gray">
                      <h2 className="f5 mv2 mr2">
                        <span>
                          Roles
                        </span>
                      </h2>
                      <div>
                        { post.frontmatter.tags.map(t => capitalize(t)).join('・') }
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
                    <div className='mv4 dark-gray'>
                      <h2 className="f5 mv2 mr2">
                        <span>
                          Teammates
                        </span>
                      </h2>
                      <span className="f5 din lh-copy">
                        {post.frontmatter.team}
                      </span>
                    </div>
                  }

                  {
                    post.frontmatter.metrics &&
                    post.frontmatter.metrics.length > 0 &&
                    <div className="mb4 dark-gray">
                      <h2 className="f5 mv2 mr2">
                        <span>
                          Metrics
                        </span>
                      </h2>
                      <div className="f5 lh-copy">
                        { post.frontmatter.metrics.map(t => capitalize(t)).join('・') }
                      </div>
                    </div>
                  } 

                  
                </div>
              </div>
            </div>
          </Fade>

          {/* Cover image */}
          <div className="flex flex-row-ns flex-column">
            <div className="w-100">
              <Reveal effect="clipIn" duration={4000}>
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

        {/* Content */}
        <div className="flex flex-column center">
          <div className={baseType}>
            { markdownRenderer(post.frontmatter.fullWidth)(post.htmlAst) }
          </div>
        </div> 

      {/* Other projects */}
      <div className="flex flex-column bg-near-white mt6 nl6-ns nr6-ns nl3 nr3 ph6-ns ph3 pb6">
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
            <Link to="/#projects" className="dim f3 fw5 link pa3 br2 text-gradient-clip ttext">
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