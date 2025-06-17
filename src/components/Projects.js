import React from 'react'
import Reveal from 'react-reveal/Reveal';

import ProjectCard from '../components/ProjectCard'
import { isMobile } from 'react-device-detect';

class Projects extends React.Component {
    render() {
        const { mini, posts } = this.props;
        if (posts.length === 0) {
            return <div></div>;
        }

        const classes = "w-100 animatable";
        
        let gridStyle = {};
        if (mini & !isMobile) {
            gridStyle = {
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '32px'
        }};

        return (
            <Reveal effect="slideUp" duration={2000}>
                <div className="mb5" style={gridStyle}> {
                        posts.map(({ node }) => {
                            return (
                                <div 
                                    className={classes}
                                    key={node.fields.slug}
                                >
                                    <ProjectCard mini={isMobile ? false : mini} node={node}/>
                                </div>
                            )
                        })
                    }
                </div>
            </Reveal>
        )
    }
}

export default Projects;