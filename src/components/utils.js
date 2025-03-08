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