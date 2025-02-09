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

        const classes = "w-100 animatable mv4-ns mv3";
        
        let gridStyle = {};
        if (mini & !isMobile) {
            gridStyle = {
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '32px'
        }};

        // const globalPadding = 'ph6-ns ph4-m ph3 ';
        // const overflowMargins =  'nl6-ns nr6-ns nl4-m nr4-m pl3-ns nr3'

        return (
            <Reveal effect="slideUp" duration={2000}>
                <div className="mb5" style={gridStyle}> {
                        posts.map(({ node }) => {
                            return (
                                <div 
                                    className={classes}
                                    key={node.fields.slug}
                                >
                                    <ProjectCard mini={mini} node={node}/>
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