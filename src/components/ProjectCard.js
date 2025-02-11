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
        const mini = this.props.mini;
        const isShowHover = post.frontmatter.hover && this.state.hover;

        let dateStart = formatDate(post.frontmatter.date, 'YYYY');
        let dateEnd = formatDate(post.frontmatter.date2, 'YYYY');
        if (dateEnd && dateEnd === dateStart) {
            dateEnd = null;
        }
 
        return (
            <Link 
                className={"project-card link near-black db br1 lh-copy " + (mini ? 'db-ns flex h-100-ns h4' : '')}
                to={post.fields.slug} 
                onMouseEnter={() => !isMobile && this.setState({hover: true})}
                onMouseLeave={() => !isMobile && this.setState({hover: false})}
            >
                <div  
                    className={"db br1 project-card--cover overflow-hidden " + (mini ? "w-100-ns w-50" : "w-100")}
                    style={ {paddingBottom: '56.25%', height: 0}}>
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

                <div className={mini ? "pl0-ns pl2 w-100 pv3-ns pv0" : "pv3-ns pv2"}>
                    {
                        post.frontmatter.title
                        &&
                        <div className={"project-card--title near-black mt0 mb1-ns mb0 " + (mini ? 'f5' : 'f3-ns f4')}>
                            {
                                post.frontmatter.title
                                + (post.frontmatter.isPasswordProtected ? ' 🔒' : '')
                            }
                        </div>
                    }

                    {
                        post.frontmatter.minibio &&
                        <div className={`project-card--description mb1 near-black lh-copy ${mini ? 'f6-ns f7' : 'f6'}`}>
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