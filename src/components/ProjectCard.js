import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"

import { isMobile } from 'react-device-detect';

// import Tag from '../components/Tag.js'

import { formatDate } from '../components/utils.js'

class ProjectCard extends React.Component {
    state = {
        hover: false,
    }

    render() {
        const post = this.props.node;
        const isShowHover = post.frontmatter.hover && this.state.hover;
        // const mini = this.props.mini;

        let dateStart = formatDate(post.frontmatter.date, 'YYYY');
        let dateEnd = formatDate(post.frontmatter.date2, 'YYYY');
        if (dateEnd && dateEnd === dateStart) {
            dateEnd = null;
        }

        return (
            <Link 
                className="project-card link near-black db br1 lh-copy "
                to={post.fields.slug} 
                onMouseEnter={() => !isMobile && this.setState({hover: true})}
                onMouseLeave={() => !isMobile && this.setState({hover: false})}
            >
                <div className="db br1 w-100 project-card--cover overflow-hidden" style={{paddingBottom: '56.25%', height: 0}}>
                    <Img
                        fluid={post.frontmatter.cover.childImageSharp.fluid}
                        className={`w-100 ${isShowHover ? 'dn' : ''}`}
                        alt=""/>
                    
                    { 
                        !isMobile && 
                        <img
                        src={post.frontmatter.hover}
                        className={`w-100 ${isShowHover ? 'o-100' : 'o-0'}`}
                        style={{objectFit: 'cover'}}/>
                    }
                </div>

                {/* <div className="ph3 pv4"> */}
                <div className="pv3">
                    {
                        post.frontmatter.title
                        &&
                        <div className="project-card--title f5 near-black mt0 mb1">
                            {
                                post.frontmatter.title
                                + (post.frontmatter.isPasswordProtected ? ' 🔒' : '')
                            }
                        </div>
                    }

                    {/* {
                        post.frontmatter.description
                        &&
                        <div className="project-card--description f6 silver lh-copy">
                            {post.frontmatter.description}
                        </div>
                    } */}

                    {
                        post.frontmatter.minibio &&
                        <div className="project-card--description f6 mb1 near-black lh-copy">
                            {post.frontmatter.minibio}
                        </div>
                    }

                    <div className="project-card--date f6 mt0 silver db-ns dn">
                        {dateStart} {dateEnd && `– ${dateEnd}`}
                    </div>

                    {/* {
                        post.frontmatter.tags &&
                        !mini &&
                        <div className="flex flex-row flex-wrap mt3">
                            {post.frontmatter.tags.map(tag => (
                                <Tag key={tag}>
                                    {tag}
                                </Tag>
                            ))}
                        </div>
                    } */}
                </div>
            </Link>
        )
    }
}

export default ProjectCard;