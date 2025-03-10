import React from 'react';
import { Link } from 'gatsby';
import { slugify } from '../components/utils.js';

class ContentNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeH: ''
    };
    this.observer = null;
    this.sectionsRefs = [];
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setState({ activeH: entry.target.id });
          }
        });
      },
      { threshold: 1 }
    );

    this.sectionsRefs.forEach((ref) => {
      if (ref) {
        this.observer.observe(ref);
      }
    });
  }

  componentWillUnmount() {
    if (this.observer) {
      this.observer.disconnect();
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
            // this.sectionsRefs[i] = document.getElementById(s.slug);
            lastH1SectionIndex = i;
            s.subsections = [];
        } else {
            sections[lastH1SectionIndex].subsections.push(s);
        }
    });

    console.debug(sections);


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
                    className={`${tabItemClasses} ${
                        this.state.activeH === s.slug ? 'dark-gray' : 'silver'
                    }`}
                    onClick={() => this.scrollToSection(s.slug)}
                    ref={(ref) => this.sectionsRefs[i] = document.getElementById(s.slug)}
                >
                    {s.title}
                </button>

                {/* H2 headings */}
                {
                    this.state.activeH === s.slug && s.subsections && s.subsections.length > 0 &&
                    <div className='pl3 bl b--light-gray mb2'>
                    {
                        s.subsections.map((ss) => (
                            <button
                                className={`${tabItemClasses} mb1 silver`}
                                onClick={() => this.scrollToSection(ss.slug)}
                                key={ss.title}
                            >
                                {ss.title}
                            </button>
                        ))
                    }
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