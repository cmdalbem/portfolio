import React from 'react';
import { slugify } from '../components/utils.js';

class ContentNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeH1: '',
            activeH2: ''
        };
        this.observerH1 = null;
        this.observerH2 = null;
        this.sectionsRefs = [];
    }

    componentDidMount() {
        this.observerH1 = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.setState({ activeH1: entry.target.id });
                    }
                });
            },
            { threshold: 1 }
        );

        this.observerH2 = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        this.setState({ activeH2: entry.target.id });
                    }
                });
            },
            { threshold: 1 }
        );

        this.sectionsRefs.forEach((ref) => {
            if (ref) {
                if (ref.tagName === 'H1') {
                    this.observerH1.observe(ref);
                } else if (ref.tagName === 'H2') {
                    this.observerH2.observe(ref);
                }
            }
        });
    }

    componentWillUnmount() {
        if (this.observerH1) {
            this.observerH1.disconnect();
        }
        if (this.observerH2) {
            this.observerH2.disconnect();
        }
    }

    scrollToSection(sectionId) {
        const el = document.getElementById(sectionId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    render() {
        const { sections } = this.props;
        if (!sections || sections.length === 0) {
            return null;
        }

        const tabItemClasses = 'bn tl ph0 pv1 mb1 f6 db dim bg-transparent';

        let lastH1SectionIndex = -1;
        sections.forEach((s, i) => {
            s.slug = slugify(s.title);
            if (s.tag === 'h1') {
                lastH1SectionIndex = i;
                s.subsections = [];
            } else {
                sections[lastH1SectionIndex].subsections.push(s);
            }
        });

        return (
            <div
                className="db-l dn z-1 w-20"
                style={{
                    position: 'sticky',
                    top: '2rem',
                    left: '4rem',
                    marginTop: '-500px',
                    height: '500px'
                }}
            >
                <div className="flex flex-column">
                    {sections.map((s, i) => (
                        s.tag === 'h1' &&
                        <div key={s.title}>
                            {/* H1 headings */}
                            <button
                                className={`
                                    ${tabItemClasses}
                                    ${this.state.activeH1 === s.slug && s.subsections.length==0 ? 'dark-gray' : 'silver'
                                }`}
                                onClick={() => this.scrollToSection(s.slug)}
                                ref={(ref) => this.sectionsRefs[i] = document.getElementById(s.slug)}
                            >
                                {s.title}
                            </button>

                            {/* H2 headings */}
                            {
                                s.subsections.length > 0 &&
                                <div className={`pl3 bl b--light-gray mb2 ${this.state.activeH1 === s.slug ? 'db' : 'dn'}`}>
                                    {s.subsections.map((ss, j) => (
                                        <button
                                            className={
                                                `${tabItemClasses} mb1 
                                                ${this.state.activeH2 === ss.slug ? 'dark-gray' : 'silver'
                                            }`}
                                            onClick={() => this.scrollToSection(ss.slug)}
                                            key={ss.title}
                                            ref={(ref) => this.sectionsRefs[i + j + 1] = document.getElementById(ss.slug)}
                                        >
                                            {ss.title}
                                        </button>
                                    ))}
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default ContentNav;