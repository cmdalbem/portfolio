import React from 'react'
import Fade from 'react-reveal/Fade';
import rehypeReact from "rehype-react"
import {navigate} from 'gatsby';

import LinksList from '../components/LinksList'


class ResultsBanner extends React.Component {
    static defaultProps = {
        data: {},
    }

    render() {
        const dataObj = JSON.parse(this.props.data);

        return (
            <div
                className="nl6-ns nr6-ns nl4-m nr4-m nl3 nr3 mv6 pa6-ns pv6 bg-near-white flex flex-row-l flex-column justify-around relative"
            >
                {
                    Object.keys(dataObj).map((i, n) => (
                        <Fade bottom duration={1500} delay={n * 500}>
                            <div className="mv0-ns mv3" key={i}>
                                <div className="f1 fw1 mt0 mb0">
                                    {dataObj[i]}
                                </div>
                                <div className="gray f5 mr2">
                                    {i}
                                </div>
                            </div>
                        </Fade>
                    ))
                }
            </div>
        )
    }
}

class ProjectPasswordInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', wrongPassword: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if (this.state.value === 'abacaxi') {
            const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
            const slug = pathname.replaceAll('/', '');
            console.debug(slug);
            navigate(`/.${slug}`);
        } else {
            this.setState({wrongPassword: true})
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div className="mv7-ns mv5 center tc mw6-ns bg-near-white pa4 br2">
                <div className="f2 mv3 br-100 pa1 h3 w3 center bg-white-70">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <div className='f5 gray'>
                    <div>This project is password-protected.</div>
                    <div><a href="mailto:cristiano.dalbem@gmail.com" className='pretty-link'>Contact me</a> if you think you should have access. </div>
                </div>
                <div className="center mt4 tc">
                    <input 
                        className={"input-reset bg-white-90 br2 pa3 db w-100 f5 gray tc " + (this.state.wrongPassword ? 'ba b--light-red' : 'b--none')}
                        type="password" 
                        placeholder="Enter password"
                        value={this.state.value} onChange={this.handleChange}
                        />
                    {
                        this.state.wrongPassword &&
                        <div className="f6 red mb2">
                            Wrong password, try again.
                        </div>
                    }
                    <button onClick={this.handleSubmit} className="bg-gradient-4 white mt3 bn br2 dib dim f5 pa3 tc w-100"> 
                        Unlock
                    </button>
                </div>
            </div> 
        )
    }
}

export function markdownRenderer(isFullWidth) {
    const defaultMargins = `${isFullWidth ? 'layoutMaxWidth' : 'mw7-l ml-auto-l'}`;
    const bigImageMargins = `mv6-ns mv5 `;
    const imageMargins = `${defaultMargins} ml0 mr0 mv6-ns mv5 `;

    return new rehypeReact({
        createElement: React.createElement,
        components: {
            h1: props => (
                <h1 className={`f2 lh-title tracked-tight dark-gray fw4 mw6-l mt6-l mt5 mb--1-l position-sticky-l h4-l bg-background-color-l`}>
                    {props.children}
                </h1>
            ),
            h2: props => (
                <h2 className={`f3 lh-title dark-gray fw4 mt5-ns mt4 mb3-ns mb2 ${defaultMargins}`}>
                    {props.children}
                </h2>
            ),
            h3: props => (
                <h3 className={`f4-ns f5 lh-title gray fw6 mt4 ${defaultMargins}`}>
                    {props.children}
                </h3>
            ),
            p: props => (
                <p className={`mt0 ${defaultMargins}`}>
                    {props.children}
                </p>
            ),
            blockquote: props => (
                <div className={`mt0 pl4 mv6 f3 gray ${defaultMargins}`}>
                    {props.children}
                </div>
            ),
            ul: props => (
                <ul className={`${defaultMargins}`} style={{paddingInlineStart: 0}}>
                    {props.children}
                </ul>
            ),
            ol: props => (
                <ol className={`${defaultMargins}`} style={{paddingInlineStart: 0}}>
                    {props.children}
                </ol>
            ),
            li: props => (
                <li className="mb2 ml-auto-l ">
                    {props.children}
                </li>
            ),
            a: props => (
                <a
                    href={props.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pretty-link"
                >
                    {props.children}
                </a>
            ),
            hr: props => (
                <hr className="mv6 bt-0 bb b--near-white" />
            ),
            figure: props => (
                <figure className={imageMargins}>{props.children}</figure>
            ),
            figcaption: props => (
                <figcaption className="mt2 f6 dark-gray">{props.children}</figcaption>
            ),
            code: props => (
                <code className="f6 bg-light-gray ph2">{props.children}</code>
            ),
            "quote": props => (
                <div className={`mt0 mv5 ${defaultMargins}`}>
                    <div className='f3 tracked-tight'>
                        <span style={{marginLeft: "-0.406em"}}>“</span>
                        {props.children}
                        <span className=''>”</span>
                    </div>
                    {
                        props.author &&
                        <div className='f5 mt2'>
                            {props.author}
                            {
                                props.context && 
                                <span className='silver ml2'>
                                    {props.context}
                                </span>
                            }
                        </div>
                    }
                </div>
            ),
            "jumbo": props => (
                <div className={bigImageMargins}>
                    {props.children}
                    {
                        props.caption &&
                        <figcaption className={"mt2 f6 dark-gray"}>
                            {props.caption}
                        </figcaption>
                    }
                </div>
            ),
            "video-container": props => (
                <div
                    className={props.jumbo ? bigImageMargins : imageMargins}
                    style={props.jumbo ? {marginLeft: 'auto', marginRight: 'auto'} : {}} // copy styles from gatsby-resp-image-wrapper
                    >
                    { props.children }
                    {
                        props.caption &&
                        <figcaption className={"mt2 f6 dark-gray"}>
                            {props.caption}
                        </figcaption>
                    }
                </div>
            ),
            "results-banner": ResultsBanner,
            "project-password-input": ProjectPasswordInput,
            "links-list": props => {
                let arrayObj = JSON.parse(props.items);
                let items = arrayObj.map(i => i);

                return (
                    <p className={`mt0 ${defaultMargins}`}>
                        <LinksList items={items} rows />
                    </p>
                )
            },
            "ai-disclaimer": props => {
                return (
                    <p className={`mv6 ${defaultMargins} i gray`}>
                        This case study leveraged generative AI technologies to help extract key insights from years of extensive project documentation I created. It also helped me suggesting improvements to the writing. All AI-generated content was thoroughly reviewed and manually edited before publishing.
                    </p>
                )
            },
            "insights": props => {
                const { title, subtitle, items } = props;
                
                let arrayObj = JSON.parse(items);
                let itemsArray = arrayObj.map(i => i);
                
                return (
                    <div className="nl6-ns nr6-ns nl4-m nr4-m nl3 nr3 mv6 pa6-ns pa3 pv6-ns pv4 bg-near-white z-0 relative">
                        <div className='mw6 mb6-ns b2'>
                            <h3 className="f3-ns f4 lh-solid fw7 mv2-ns mb2 dark-gray">
                                { title }
                            </h3>
                        
                            <div className="f4-ns f5 fw5 pr4-ns mb5-ns mb4 mt0-ns mt0 lh-copy measure gray">
                                { subtitle }
                            </div>
                        </div>

                        <div className='grid3-4-ns grid2-4-m'>
                        {
                            itemsArray.map((l, i) => (
                                <Fade duration={1500} delay={i*500 - i*200}>
                                    {/* // <div className="ba b--light-gray pa3 br4" key={i}> */}
                                    <div className="mv4" key={i}>
                                        {/* <div className="f6">
                                            ({i+1})
                                        </div> */}
                                        <h4 className="mv2 fw4 lh-title dark-gray">
                                            {l.title}  
                                        </h4>
                                        <div className="gray lh-copy">
                                            {l.description}
                                        </div>
                                    </div>
                                </Fade>
                            ))
                        }
                        </div>
                    </div>
                )
            },
        },
    }).Compiler;
}