import React from 'react'

class HomeSection extends React.Component {
    render() {
        const { title, description, children, fullScreen } = this.props;
        const anchor = title.toLowerCase();

        // const containerClasses = `${fullScreen && 'bg-near-white nl4-ns nr4-ns'}`;
        const containerClasses = 'mv7-ns mv4 ';

        const descriptionContent = (
            description &&
            <p className="f4 dark-gray fw5 mb5-ns mb4 mt0-ns mt0 lh-copy measure-wide">
                {description}
            </p>
        );

        return (
            <section id={anchor} className={containerClasses}>
                <div className="flex flex-column w-100">
                    <h2 className="f1-ns f1 fw4 mv0-ns mb2 dark-gray left-3-ns ml7-ns ml4-ns">{title}</h2>
                    
                    <div className="left-3-ns ml7-ns ml4-ns mt2">
                        { descriptionContent }
                    </div>
                </div>

                <div className="mb4 flex flex-row-ns flex-column items-top">
                    {
                        fullScreen ?
                            <div className='w-100-ns'>
                                {children}
                            </div>
                            :
                            <>
                                <div className='w-50-ns'></div>
                                <div className='w-50-ns f5 mt0'>
                                    { children }
                                </div>
                            </>
                    }
                </div>
            </section>
        )
    };
};

export default HomeSection
