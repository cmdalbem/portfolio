import React from 'react'
import Reveal from 'react-reveal/Reveal';
import { isFunctionOrClass } from '../components/reveal-ssr-helper';

import ProjectCard from '../components/ProjectCard'

// Fallback component for SSR when Reveal is not available
const RevealOrDiv = isFunctionOrClass(Reveal) ? Reveal : (({ children }) => <div>{children}</div>);

// Handle SSR - react-device-detect is nulled during build
let isMobile = false;
if (typeof window !== 'undefined') {
    try {
        const deviceDetect = require('react-device-detect');
        isMobile = deviceDetect.isMobile;
    } catch (e) {
        // Fail silently during SSR
    }
}

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
            <RevealOrDiv effect="slideUp" duration={2000}>
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
            </RevealOrDiv>
        )
    }
}

export default Projects;