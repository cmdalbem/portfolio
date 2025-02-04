import React from 'react';

import { ThemeToggler } from 'gatsby-plugin-dark-mode'


const sunIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sun"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const moonIcon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-moon"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;

const ThemeToggle = props => {
    const { classes } = props;

    return (
        <ThemeToggler>
            {({ theme, toggleTheme }) => (
                <label className={'pointer pa3 ' + classes}>
                    <input
                        type="checkbox"
                        className='input-reset'
                        onChange={e => toggleTheme(e.target.checked ? 'dark' : 'light')}
                        checked={theme === 'dark'}
                    />
                    <span className="gray">
                        <span className="absolute right-0 opacity-animate" style={{opacity: theme === 'dark' ? 1 : 0}}>
                            { moonIcon }
                        </span>
                        <span className="absolute right-0 opacity-animate" style={{opacity: theme === 'light' ? 1 : 0}}>
                            { sunIcon }
                        </span>
                    </span>
                </label>
            )}
        </ThemeToggler>
    );
};

export default ThemeToggle;