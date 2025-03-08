import React from 'react'

class ReadingProgressBar extends React.Component {
    constructor(props) {
        super(props);

        let listenerCallback;

        // Prevent error on server-side renderer
        if (typeof window !== 'undefined') {
            listenerCallback = () => {
                const h = document.documentElement;
                const b = document.body;
                const st = 'scrollTop';
                const sh = 'scrollHeight';
                let scroll;
    
                scroll = ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
    
                this.setState({
                    scroll: scroll
                });
            }
            document.addEventListener('scroll', listenerCallback, { passive: true });
        }

        this.state = {
            listenerCallback: listenerCallback,
            scroll: 0
        };
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.state.listenerCallback);
    }

    render() {
        const barColor = this.props.barColor || 'var(--orange)';

        return (
            <div 
                className="fixed top-0 left-0 right-0 z-3"
                style={{
                    background: barColor,
                    width: `${this.state.scroll}%`,
                    height: '4px'
                }}
            >
            </div>
        )
    }
}

export default ReadingProgressBar