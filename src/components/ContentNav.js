import React from 'react';
import { Link } from 'gatsby';
import { slugify } from '../components/utils.js';

class ContentNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: ''
    };
    this.observer = null;
    this.sectionsRefs = [];
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.setState({ activeSection: entry.target.id });
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

    const sectionsSlugs = sections.map((section) => slugify(section));
    const tabItemClasses = 'bn tl ph0 pv1 mv0 f6 dim db bg-transparent';

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
          {sections.map((section, index) => (
            <button
              className={`${tabItemClasses} ${
                this.state.activeSection === sectionsSlugs[index] ? 'dark-gray' : 'silver'
              }`}
              onClick={() => this.scrollToSection(sectionsSlugs[index])}
              key={section}
              ref={(el) => (this.sectionsRefs[index] = document.getElementById(sectionsSlugs[index]))}
            >
              {section}
            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default ContentNav;