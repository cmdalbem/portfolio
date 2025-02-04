import React from 'react'

import Reveal from 'react-reveal/Reveal';

import ProjectCard from '../components/ProjectCard'

class Projects extends React.Component {
    render() {
        const posts = this.props.posts;
        if(posts.length === 0) {
            return <div></div>
        }

        const mini = this.props.mini;

        let classes = mini ? "w-third-ns w-third-m w-50 pr4-ns pr3-m pr3 " : "w-100-ns w-100-m w-100 ";
        classes += "animatable mv4-ns mv3 ";

        // const globalPadding = 'ph6-ns ph4-m ph3 ';
        const overflowMargins =  'nl6-ns nr6-ns nl4-m nr4-m pl3-ns nr3'

        return (
            <Reveal effect="slideUp" duration={2000}>
                <div className={`flex flex-wrap mb5`}>
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
                </div>
            </Reveal>
        )
    }
}

export default Projects;