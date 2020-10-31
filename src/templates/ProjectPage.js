import React from 'react'
import Helmet from 'react-helmet'
import { Link,graphql } from 'gatsby'
import Img from "gatsby-image"

import Reveal from 'react-reveal/Reveal';
import Fade from 'react-reveal/Fade';

import rehypeReact from "rehype-react"

import Tag from '../components/Tag'
import Layout from '../components/Layout'
import ProjectCard from '../components/ProjectCard'
import LinksList from '../components/LinksList'
import ReadingProgressBar from '../components/ReadingProgressBar'

import { formatDate } from '../components/utils.js'
 
// import { RightArrow, LeftArrow } from '../components/icons.js'

class ResultsBanner extends React.Component {
  static defaultProps = {
    data: {},
  }

  render() {
    const dataObj = JSON.parse(this.props.data);

    return (
      <div 
        className="nl6 nr6 nl4-m nr4-m nl3 nr3 mv6 pa6 bg-near-white flex flex-row-l flex-column justify-around tl-ns tc"
      >
        {
          Object.keys(dataObj).map ( (i, n) => (
            <Fade bottom duration={1500} delay={n*500}>
              <div className="mv0-ns mv3" key={i}>
                <div className="f1 fw1 mt0">
                  {dataObj[i]}
                </div>
                <div className="f7 gray ttu mb0 tracked">
                  {i}
                </div>
              </div>
            </Fade>
          ))
        }
      </div>
    )
  }
}

class ProjectPage extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteDescription = post.excerpt
    const { previous, next } = this.props.pageContext
    const readingTime = post.fields.readingTime; 

    const defaultMargins = 'mw7 center layoutMaxWidth';
    const bigImageMargins = `nl5-ns nr5-ns nl3-m nr3-m mv6-ns mv5 `;
    const imageMargins = `${defaultMargins} mv6-ns mv5 `;
    const baseType = 'f4-ns f5 dark-gray lh-copy ';

    let dateStart = formatDate(post.frontmatter.date, 'MMMM YYYY');
    let dateEnd = formatDate(post.frontmatter.date2, 'MMMM YYYY');
    if (dateEnd && dateEnd === dateStart) {
      dateEnd = null;
    }

    const renderAst = new rehypeReact({
      createElement: React.createElement,
      components: {
        h1: props => (
          <h1 className={`f2 lh-title fw7 dark-gray mt6-ns mb5-ns mt5 mb4 ${defaultMargins}`}>
            {props.children}
          </h1>
        ), 
        h2: props => (
          <h2 className={`f3 lh-title dark-gray fw7 mt5-ns mb3-ns mt4 mb2 ${defaultMargins}`}>
            {props.children}
          </h2> 
        ),
        h3: props => (
          <h3 className={`f3 lh-title gray fw7 mt4 mb3 ${defaultMargins}`}>
            {props.children}
          </h3>
        ),
        p: props => (
          <p className={`mt0 ${defaultMargins}`}>
            {props.children
          }</p>
        ),
        blockquote: props => (
          <div className={`mt0 ml5 mv5 f3 fw6`} style={{textIndent: '-.5em'}}>
            {props.children}
          </div>
        ),
        ul: props => (
          <ul className={`${defaultMargins}`}>
            {props.children}
          </ul>
        ),
        li: props => (
          <li className="mb2">
            {props.children}
          </li>
        ),
        a: props => (
          <a
            href={props.href}
            target="_blank"
            rel="noopener noreferrer"
            className="pretty-link"
          >
            {props.children}
          </a>
        ), 
        hr: props => (
          <hr className="mv6 bt-0 bb b--black-10" />
        ),
        figure: props => (
          <figure className={imageMargins}>{props.children}</figure>
        ),
        figcaption: props => (
          <figcaption className="mt4 fw6 f6 dark-gray tc">{props.children}</figcaption>
        ),
        code: props => (
          <code className="f6 bg-light-gray ph2">{props.children}</code>
        ),
        "jumbo": props => (
          <div className={bigImageMargins}>
            { props.children }
            {
              props.caption &&
              <figcaption className={defaultMargins + " mt4 fw6 f6 dark-gray tc"}>
                {props.caption}
              </figcaption>
            }
          </div>
        ),
        "video-container": props => (
          <div className={imageMargins}> 
            {props.children}
          </div>
        ),
        "results-banner": ResultsBanner,
        "links-list": props => {
          let arrayObj = JSON.parse(props.items);
          let items = arrayObj.map( i => i);
          
          return (
            <p className={`mt0 ${defaultMargins}`}>
              <LinksList items={items} rows/>
            </p>
          )
        }
      },
    }).Compiler;
    
    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title}`}
        />

        <ReadingProgressBar barColor={post.frontmatter.color}/>
        
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
                <h1 className="f1 mt0 fw8 mb3 dark-gray lh-solid">
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
                <div className='f6 gray db-ns dn'>
                  {readingTime.text}
                </div>
              </div>

              <div className="w-10-ns">
              </div>

              <div className="w-30-ns">
                {
                  post.frontmatter.tags &&
                  <div className="mb4 dark-gray">
                    <h2 className="f6 fw6 ttu mv2 fw7 mr2">
                      <span className="">
                        Roles
                        </span>
                    </h2>
                    <div className="">
                      {post.frontmatter.tags.map(tag => (
                        <Tag size="big" key={tag}>
                          {tag}
                        </Tag>
                      ))}
                    </div>
                  </div>
                }

                {
                  post.frontmatter.team &&
                  <div className='mv4 dark-gray'>
                    <h2 className="f6 fw6 ttu mv2 fw7 mr2">
                      <span className="">
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
                      <span className="">
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
                  <div className="mv5">
                    <a
                      href={post.frontmatter.liveLink} target="_blank" rel="noopener noreferrer"
                      className="gradient-border text-gradient-clip bg-gradient dim f5 fw6 link orange pv2 ph3"
                    >
                      See it live
                    </a>
                  </div>
                }
              </div>
            </div>
          </Fade>
        </div>

        {/* Content */}
        <div className="flex flex-column">
          <div className={baseType}>
            { renderAst(post.htmlAst) }
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
                  <div className="f6 tl mb1 fw7 ttu black-20 db-ns dn">
                    Previous
                  </div>
                  <ProjectCard node={previous} />
                </div>
              }
            </div> 

            <div className="w-10-ns mv0-ns mv3"></div>

            <div className="w-40-ns w-100">
              {
                next &&
                <div>
                  <div className="f6 tl mb1 fw7 ttu black-20 db-ns dn">
                    Next
                  </div>
                  <ProjectCard node={next} />
                </div>
              }
            </div>
          </div>

          <div className="w-100 tc mt6">
            <Link to="/#case studies" className="gradient-border text-gradient-clip bg-gradient dim f4 fw6 link pa3">
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
               date
               date2
               liveLink
               tags
               team
               color
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
               readingTime {
                 text
               }
             }
           }
         }
       `