import React from 'react'

const footerIconsClasses = 'pl4-ns pr0-ns pr3 pl0 dim gray';

const Footer = () => (
    <div className="flex flex-row-ns flex-column pv6 w-100 justify-between layoutMaxWidth center">
        <div className="f7 mw6-ns lh-copy">
            <p className='f5 dark-gray'>
                "Computers are like a bicycle for the mind."
            </p>

            <div className='silver'>
                <div className='mt1 mb0'>
                    Fonts by <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://pangrampangram.com/">Pangram</a> and <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://fonts.google.com/">Google Fonts</a>. Handcrafted in <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://reactjs.org/">React</a> and <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://www.gatsbyjs.com/">Gatsby</a>. Lorenz Attractor Processing script adapted from <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://openprocessing.org/sketch/1839023">Attractors</a> by <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://openprocessing.org/user/175744/?view=sketches">Leb371</a>.
                </div>
                <div className='mt1 mb0'>
                    Powered by <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://loja.badentorrefacao.com.br/">☕️ Brazilian coffee</a> and <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://photos.app.goo.gl/XvKqB3ZJCBAsBUbs8">🍌 banana pancakes</a>.
                </div>
            </div>
 
        </div>
        <div className="mv4 mv0-ns">
            {/* GitHub */}
            <a
                className={footerIconsClasses}
                href="https://github.com/cmdalbem/">
                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.018c0 4.428 2.867 8.182 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.154-1.109-1.462-1.109-1.462-.908-.621.069-.609.069-.609 1.004.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.254-.446-1.274.098-2.656 0 0 .84-.27 2.751 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.382.203 2.402.1 2.656.64.7 1.028 1.595 1.028 2.688 0 3.848-2.337 4.695-4.566 4.943.359.309.679.92.679 1.855 0 1.339-.012 2.421-.012 2.751 0 .268.18.579.688.48A10.018 10.018 0 0 0 22 12.018C22 6.484 17.523 2 12 2z"/>
                </svg>
            </a>

            {/* LinkedIn */}
            <a
                className={footerIconsClasses}
                href="https://www.linkedin.com/in/cmdalbem/">
                <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' viewBox="0 0 30 30" width="30px" height="30px">    <path d="M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M10.496,8.403 c0.842,0,1.403,0.561,1.403,1.309c0,0.748-0.561,1.309-1.496,1.309C9.561,11.022,9,10.46,9,9.712C9,8.964,9.561,8.403,10.496,8.403z M12,20H9v-8h3V20z M22,20h-2.824v-4.372c0-1.209-0.753-1.488-1.035-1.488s-1.224,0.186-1.224,1.488c0,0.186,0,4.372,0,4.372H14v-8 h2.918v1.116C17.294,12.465,18.047,12,19.459,12C20.871,12,22,13.116,22,15.628V20z"/></svg>
            </a>
            
            {/* Email */}
            <a
                className={footerIconsClasses}
                href="mailto:cristiano.dalbem@gmail.com">
                <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                </svg>
            </a>
        </div>
    </div>
)

export default Footer
