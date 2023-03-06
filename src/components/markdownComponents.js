import React from 'react'
import Fade from 'react-reveal/Fade';
import rehypeReact from "rehype-react"

import LinksList from '../components/LinksList'


class ResultsBanner extends React.Component {
    static defaultProps = {
        data: {},
    }

    render() {
        const dataObj = JSON.parse(this.props.data);

        return (
            <div
                className="nl6-ns nr6-ns nl4-m nr4-m nl3 nr3 mv6 pa6-ns pv6 bg-near-white flex flex-row-l flex-column justify-around tl-ns tc"
            >
                {
                    Object.keys(dataObj).map((i, n) => (
                        <Fade bottom duration={1500} delay={n * 500}>
                            <div className="mv0-ns mv3" key={i}>
                                <div className="f1 fw1 mt0">
                                    {dataObj[i]}
                                </div>
                                <div className="f7 gray ttu mb0 tracked">
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
    render() {
        return (
            <div class="silver mv7 center mw6 bg-near-white ph5 pv4 br2">
                <div class="f2">
                    🔒
                </div>
                <div className='f5'>
                    This project is password-protected. <a href="mailto:cristiano.dalbem@gmail.com" className='pretty-link'>Contact me</a> if you think you should have it.
                </div>
                <div className="center mt4">
                    <input class="input-reset ba b--none bg-white br2 pa3 mb2 db w-100 f5" type="password" id="password" placeholder="Password" aria-describedby="password-desc" />
                    <a href="#" className="b--orange ba br2 dib dim f5 fw6 link orange pa3 tc w-100"> 
                        Unlock
                    </a>
                </div>
            </div> 
        )
    }
}

export function markdownRenderer(isFullWidth) {
    const defaultMargins = `center ${isFullWidth ? 'layoutMaxWidth' : 'mw7'}`;
    const bigImageMargins = `nl5-ns nr5-ns nl3-m nr3-m mv6-ns mv5 `;
    const imageMargins = `${defaultMargins} mv6-ns mv5 `;

    return new rehypeReact({
        createElement: React.createElement,
        components: {
            h1: props => (
                <h1 className={`f2 lh-title dark-gray fw4 mt6-ns mt5 mb4 ${defaultMargins}`}>
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
                    {props.children
                    }</p>
            ),
            blockquote: props => (
                <div className={`mt0 pl4 mv5 f3 gray ${defaultMargins}`} style={{ textIndent: '-.5em' }}>
                    {props.children}
                </div>
            ),
            ul: props => (
                <ul className={`${defaultMargins}`}>
                    {props.children}
                </ul>
            ),
            li: props => (
                <li className="mb2">
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
                <hr className="mv6 bt-0 bb b--black-10" />
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
            "jumbo": props => (
                <div className={bigImageMargins}>
                    {props.children}
                    {
                        props.caption &&
                        <figcaption className={defaultMargins + " mt2 f6 dark-gray tc"}>
                            {props.caption}
                        </figcaption>
                    }
                </div>
            ),
            "video-container": props => (
                <div className={imageMargins}>
                    {props.children}
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
            }
        },
    }).Compiler;
}