import React from 'react'

import Reveal from 'react-reveal/Reveal';

import ProjectCard from '../components/ProjectCard'

class Projects extends React.Component {
    render() {
        const posts = this.props.posts;
        const mini = this.props.mini;

        let classes = mini ? "w-25-ns w-25-m w-50 " : "w-50-ns w-50-m w-100 ";
        classes += "animatable mv4-ns mv3 pr4-ns pr3-m pr3";

        // const globalPadding = 'ph6-ns ph4-m ph3 ';
        const overflowMargins =  'nl6-ns nr6-ns nl4-m nr4-m pl3-ns nr3'

        return (
            <div className={`flex flex-wrap mb5`}>
                <Reveal effect="slideUp" duration={2000}>
                {
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
                </Reveal>
            </div>
        )
    }
}

export default Projects;