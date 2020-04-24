import React from 'react'

class Reading extends React.Component {
    render() {
        let { bookNodes } = this.props;

        bookNodes.finished = bookNodes.finished.reverse().slice(0, 3);

        return (
            <>
                <div className="flex flex-wrap nr3">
                    {
                        bookNodes.reading.map(i =>
                            <Book mode="half" book={i.node.book}/>
                        )
                    }
                </div>
                
                {/* <h2 className="dark-gray f5 mb4">Recently finished</h2>
                
                <div className="flex flex-wrap">
                    {
                        bookNodes.finished.map(i =>
                            <Book mode="mini" book={i.node.book}/>
                        )
                    }
                </div> */}
            </>
        )
    }
}

class Book extends React.Component {
    render() {
        const { book, mode } = this.props;

        let containerClasses = 'animatable flex flex-row pr3-ns mb5-ns w-50-m ph2-m mb4 dim link ';
        let titleClasses = ' lh-title ';
        let subtitleClasses = '';

        switch(mode) {
            case 'half':
                containerClasses += "w-50-ns w-100";
                titleClasses += 'f5-ns f5 l'
                subtitleClasses += 'f7-ns f6 mb1 fw4 gray'
                break;
            case 'full':
                containerClasses += "w-100";
                titleClasses += 'f4'
                subtitleClasses += 'f6'
                break;
            case 'mini':
                containerClasses += "w-third-ns w-50";
                titleClasses += 'f5 fw6'
                subtitleClasses += 'f6'
                break;
            default:
                break;
        }


        return (
            <a
                className={containerClasses}
                target="_blank"
                rel="noopener noreferrer"
                href={book.link}
            >
                <img className="card-shadow" src={book.imageUrl} alt={book.title + ' book cover'}></img>
                
                {
                    mode !== 'mini' &&
                    <div className="flex flex-column ml3 dark-gray">
                        <div className={subtitleClasses}>
                            {book.authors[0].name}
                        </div>
                        <div className={titleClasses}>
                            {book.title}
                        </div>
                    </div>
                }
            </a>
        )
    }
}

export default Reading;