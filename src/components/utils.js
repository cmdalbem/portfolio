import React from 'react'

import moment from 'moment'

export const formatDate = function (date, form) {
    if (!date) {
        return null;
    } else if (date.toLowerCase() === 'now') {
        return 'Now';
    } else {
        return moment(date).format(form);
    }
}

export const sortPosts = function (posts) {
    let priorizedPosts = posts.filter(p => p.node.frontmatter.forceOrder);
    priorizedPosts = priorizedPosts.sort((a,b) => {
        return a.node.frontmatter.forceOrder - b.node.frontmatter.forceOrder;
    }); 
    
    const nonPriorizedPosts = posts.filter(p => !p.node.frontmatter.forceOrder);

    let priorizedList = [...priorizedPosts, ...nonPriorizedPosts];
    return priorizedList.sort((b,a) =>
            (a.node.frontmatter.date2 
                ? a.node.frontmatter.date2.split('-')[0]
                : a.node.frontmatter.date.split('-')[0])
            -
            (b.node.frontmatter.date2
                ? b.node.frontmatter.date2.split('-')[0]
                : b.node.frontmatter.date.split('-')[0])
        );
}

export const capitalize = function (str) {
    str = str.split(' ');
    let capitalized = str.map(function(word) {
        return word.charAt(0).toUpperCase() + word.substring(1, word.length);
    });
    return capitalized.join(' ');
}

export const slugify = function (text) {
    if (!text)
        return;
    else {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-')           // Replace spaces with -
            .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
            .replace(/\-\-+/g, '-')         // Replace multiple - with single -
            .replace(/^-+/, '')             // Trim - from start of text
            .replace(/-+$/, '');            // Trim - from end of text
    }
}

export const ROLE_ICONS = {
    'Designer': <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pen-tool"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>,
    'Engineer': <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-code"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>,
    'Product Manager': <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-compass"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
    'Researcher': <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-zoom-in"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    'Entrepreneur': <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-briefcase"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
    'Branding': <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-image"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
}

export const ROLES_MAP = {
  'Design': 'Designer',
  'Product Design': 'Designer',
  'Product Management': 'Product Manager',
  'Research': 'Researcher',
  'UX Research': 'Researcher',
  'Front-end': 'Engineer',
  'Web Development': 'Engineer',
}