import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"

import { isMobile } from 'react-device-detect';
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
                className={"project-card link near-black db lh-copy " + (mini ? 'db-ns flex h-100-ns' : '')}
                to={post.fields.slug} 
                onMouseEnter={() => this.setState({hover: isMobile ? false : true})}
                onMouseLeave={() => this.setState({hover: isMobile ? false : false})}
            >
                <div className={"db br2 project-card--cover overflow-hidden " + (mini ? "w-100-ns w-50 h-100 aspect-ratio-ns aspect-ratio--16x9-ns" : "w-100 aspect-ratio aspect-ratio--16x9")}>
                    <Img
                        fluid={post.frontmatter.cover.childImageSharp.fluid}
                        className={`w-100  ${isShowHover ? 'dn' : ''}`}
                        alt=""/>
                    
                    {/* { 
                        !isMobile && 
                        <img
                        src={post.frontmatter.hover}
                        className={`w-100 ${isShowHover ? 'o-100' : 'o-0'}`}
                        style={{objectFit: 'cover'}}/>
                    } */}
                </div>

                <div className={mini ? "pl0-ns pl2 w-100 pv3-ns pv0" : "pv3-ns pv2"}>
                    {
                        post.frontmatter.title &&
                        <div className={"project-card--title near-black mt0 mb1-ns mb0 " + (mini ? 'f5' : 'f3-ns f5')}>
                            {post.frontmatter.title}
                            {
                                post.frontmatter.isPasswordProtected &&
                                <span className='ml2 silver'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                                </span>
                            }
                        </div>
                    }

                    {
                        post.frontmatter.minibio &&
                        <div className={`project-card--description mb1 near-black lh-copy ${mini ? 'f6-ns f7' : 'f6'}`}>
                            {post.frontmatter.minibio}
                        </div>
                    }

                    <div to="/" className="dn-ns link dib dark-gray f7 fw4 pv1 ph2 mv1 br-pill ba b--light-silver">
                        Read case study
                    </div>

                    <div className="project-card--date f6 mt0 silver relative overflow-hidden h1">
                        <span className="absolute silver"
                        style={{
                            transform: this.state.hover ? 'translateY(0%)' : 'translateY(-100%)',
                            transition: "transform 200ms"}
                        }>
                            {dateStart} {dateEnd && `– ${dateEnd}`}
                        </span>
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