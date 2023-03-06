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
import { formatDate, capitalize } from '../components/utils.js'
 
// import { RightArrow, LeftArrow } from '../components/icons.js'


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
        
        {/* <BrowserView>
          <ReadingProgressBar barColor={post.frontmatter.color}/>
        </BrowserView> */}
        
        <div className="center layoutMaxWidth">
          {/* Cover image */}
          <div className="flex flex-row-ns flex-column mt5 mb5">
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

          {/* Heading */}
          <Fade duration={1500} delay={1000}>
            <div className="flex flex-row-ns flex-column mb4">
              <div className="w-60-ns">
                <h1 className="f1 mt0 fw7 mb3 lh-solid tracked-tight" style={{color: post.frontmatter.color}}>
                  {post.frontmatter.title}
                </h1>
                {
                  post.frontmatter.description &&
                  <div className="mb3 dark-gray">
                    <div className='f3 dark-gray lh-copy'>
                      {post.frontmatter.description}
                    </div>
                  </div>
                }
                <div className='f5 gray db-ns dn'>
                  {readingTime.text}
                </div>
              </div>

              <div className="w-10-ns">
              </div>

              <div className="w-30-ns">
                {
                  <div className='mv4 dark-gray'>
                    <h2 className="f6 fw6 ttu mv2 fw7 mr2">
                      <span>
                        Challenge
                      </span>
                    </h2>
                    <span className="f5 din lh-copy">
                      {post.frontmatter.minibio}
                    </span>
                  </div>
                }

                {
                  post.frontmatter.metrics &&
                  post.frontmatter.metrics.length > 0 &&
                  <div className="mb4 dark-gray">
                    <h2 className="f6 fw6 ttu mv2 fw7 mr2">
                      <span>
                        Business metrics
                      </span>
                    </h2>
                    <div className="f5 lh-copy">
                      { post.frontmatter.metrics.map(t => capitalize(t)).join('・') }
                    </div>
                  </div>
                }

                {
                  post.frontmatter.tags &&
                  post.frontmatter.tags.length > 0 &&
                  <div className="mb4 dark-gray">
                    <h2 className="f6 fw6 ttu mv2 fw7 mr2">
                      <span>
                        Roles
                      </span>
                    </h2>
                    <div>
                      { post.frontmatter.tags.map(t => capitalize(t)).join('・') }
                      {/* {post.frontmatter.tags.map(tag => (
                        <Tag size="big" key={tag}>
                          {tag}
                        </Tag>
                      ))} */}
                    </div>
                  </div>
                }

                {
                  post.frontmatter.team &&
                  <div className='mv4 dark-gray'>
                    <h2 className="f6 fw6 ttu mv2 fw7 mr2">
                      <span>
                        Team
                      </span>
                    </h2>
                    <span className="f5 din lh-copy">
                      {post.frontmatter.team}
                    </span>
                  </div>
                }

                {
                  <div className="mv4 dark-gray">
                    <h2 className="f6 fw6 ttu mv2 fw7 mr2">
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
                  </div>
                }

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
                    className="dib f5 fw6 link pv3 ph5 ba dim"
                    style={
                      { 
                        backgroundColor : post.frontmatter.color,
                        color: "#FFFFFF"
                      }
                    }
                  >
                    See it live
                  </a>
                }
              </div>
            </div>
          </Fade>
        </div>

        {/* Content */}
        <div className="flex flex-column">
          <div className={baseType}>
            { markdownRenderer(post.frontmatter.fullWidth)(post.htmlAst) }
          </div>
        </div> 

      {/* Other projects */}
      <div className="flex flex-column bg-near-white mt6 nl6 nr6 ph6 pb6">
          <div className="w-100 tc f2 mv6">
            <h2 className="f1 fw4 dark-gray">Other projects</h2>
          </div>

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
            <Link to="/#case studies" className="gradient-border text-gradient-clip bg-gradient dim f4 fw6 link pa3 br1">
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
               liveLink
               isPasswordProtected
               tags
               metrics
               team
               color
               fullWidth
               hover
               cover {
                  childImageSharp {
                    fluid(maxWidth: 1440) {
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
               }
             }
           }
         }
       `