import React from 'react'

class HomeSection extends React.Component {
    render() {
        const { title = "", description, children, fullScreen, className = "" } = this.props;
        const anchor = title.toLowerCase();

        // const containerClasses = `${fullScreen && 'bg-near-white nl4-ns nr4-ns'}`;
        let containerClasses = className + ' mv6-ns mv5 ';
        containerClasses += `${fullScreen ? '' : 'flex-ns w-100'}`;

        const descriptionContent = (
            description &&
            <p className="f4-ns f6 fw5 pr4-ns mb5-ns mb4 mt0-ns mt0 lh-copy measure gray">
                {description}
            </p>
        );

        return (
            <section id={anchor} className={containerClasses}>
                <div className={`flex flex-column ${fullScreen ? 'w-100' : 'w-50-ns'}`}>
                    <h2 className="f3-ns f5 lh-solid fw4 mv2-ns mb2 dark-gray">{title}</h2>
                    
                    <div className="mt2-ns mt0">
                        { descriptionContent }
                    </div>
                </div>

                <div className={`mb4 flex flex-row-ns flex-column items-top ${fullScreen ? 'w-100' : 'w-50-ns'}`}>
                    {
                        fullScreen ?
                            <div className='w-100'>
                                {children}
                            </div>
                            :
                            <div className='f5 mt0 w-100'>
                                { children }
                            </div>
                    }
                </div>
            </section>
        )
    };
};

export default HomeSection
