import React from 'react'
import { Link } from 'gatsby'
import Img from "gatsby-image"

import { isMobile } from 'react-device-detect';
import { formatDate, ROLES_MAP, capitalize } from '../components/utils.js'

import Tag from '../components/Tag';

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
                className={"project-card link near-black db lh-copy " + (mini ? 'db-ns flex h-100-ns mv2' : 'mt3-ns mb5-ns mv3')}
                to={post.fields.slug} 
                onMouseEnter={() => this.setState({hover: isMobile ? false : true})}
                onMouseLeave={() => this.setState({hover: isMobile ? false : false})}
            >
                <div className={"db project-card--cover overflow-hidden " + (mini ? "w-100-ns w-50 h-100 aspect-ratio-ns aspect-ratio--16x9-ns" : "w-100 aspect-ratio aspect-ratio--16x9")}>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
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

                    {
                        post.frontmatter.tags && 
                        <div className="flex flex-row mt3 nl1">
                            {
                                post.frontmatter.tags.map(function(t) {
                                    t = capitalize(t);
                                    t = ROLES_MAP[t] || t;

                                    let icon;
                                    if (t === 'Designer') {
                                        icon = <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="m307-320-87-360 260-240 260 240-87 360H307Zm63-80h220l61-253-131-121v106q14 10 22 25t8 33q0 29-20.5 49.5T480-540q-29 0-49.5-20.5T410-610q0-18 8-33t22-25v-106L309-653l61 253ZM160-120l22-65q8-25 29-40t47-15h444q26 0 47 15t29 40l22 65H160Z"/></svg>;
                                        t = 'Design';
                                    } else if (t === 'Engineer') {
                                        icon = <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="currentColor"><path d="m384-336 56-57-87-87 87-87-56-57-144 144 144 144Zm192 0 144-144-144-144-56 57 87 87-87 87 56 57ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>;
                                        t = 'Code';
                                    } else {
                                        return null;
                                    }

                                    return (
                                        <Tag key={t} icon={icon} fill> {t} </Tag>
                                    )
                                })
                            }
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
                </div>
            </Link>
        )
    }
}

export default ProjectCard;