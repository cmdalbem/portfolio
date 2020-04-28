import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"

import Tag from '../components/Tag.js'

import { formatDate } from '../components/utils.js'

class ProjectCard extends React.Component {
    render() {
        const post = this.props.node;
        const mini = this.props.mini;

        let dateStart = formatDate(post.frontmatter.date, 'YYYY');
        let dateEnd = formatDate(post.frontmatter.date2, 'YYYY');
        if (dateEnd && dateEnd === dateStart) {
            dateEnd = null;
        }

        return (
            <Link
                // className="b--light-gray bg-white br0 db near-black overflow-hidden card-shadow card-hover"
                className="project-card link near-black db br1 lh-copy"
                to={post.fields.slug} 
            >
                {
                    // <div
                    //     className={`w-100 db project-card--cover cover card-shadow br1 ${mini ? "h4" : "h5-ns h4"}`}
                    //     // className="w-100 db project-card--cover cover" 
                    //     style={ post.frontmatter.cover && {
                    //         backgroundImage: `url(${post.frontmatter.cover.publicURL})`,
                    //         backgroundPosition: 'center'
                    //     }}
                    // ></div>
                    <Img 
                        className={`w-100 db project-card--cover cover card-shadow br1 ${mini ? "h4" : "h5-ns h4"}`}
                        fluid={post.frontmatter.cover.childImageSharp.fluid}
                        alt="" 
                    />
                }

                {/* <div className="ph3 pv4"> */}
                <div className="pv3">
                    <div className="project-card--date f6 mt1 silver">
                        {dateStart} {dateEnd && `– ${dateEnd}`}
                    </div>

                    {
                        post.frontmatter.title
                        &&
                        <h3 className="project-card--title f4 fw7 near-black mt0 mb0">
                            {post.frontmatter.title}
                        </h3>
                    }

                    {/* {
                        post.frontmatter.description
                        &&
                        <div className="project-card--description f6 silver lh-copy">
                            {post.frontmatter.description}
                        </div>
                    } */}

                    {
                        post.frontmatter.minibio
                        &&
                        <div className="project-card--description f5 mt0 gray lh-copy">
                            {post.frontmatter.minibio}
                        </div>
                    }

                    {
                        post.frontmatter.tags &&
                        !mini &&
                        <div className="flex flex-row flex-wrap mt2">
                            {post.frontmatter.tags.map(tag => (
                                <Tag>
                                    {tag}
                                </Tag>
                            ))}
                        </div>
                    }
                </div>
            </Link>
        )
    }
}

export default ProjectCard;