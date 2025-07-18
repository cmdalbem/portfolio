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
                    Fonts by <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://pangrampangram.com/">Pangram</a> and <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://fonts.google.com/">Google Fonts</a>.
                </div>
                <div className='mt1 mb0'>
                    Handcrafted in <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://reactjs.org/">React</a> and <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://www.gatsbyjs.com/">Gatsby</a>.
                </div>
                <div className='mt1 mb0'>
                    Powered by <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://loja.badentorrefacao.com.br/">☕️ Brazilian coffee</a> and <a target="_blank" rel="noopener noreferrer" className="link gray" href="https://photos.app.goo.gl/XvKqB3ZJCBAsBUbs8">🍌 banana pancakes</a>.
                </div>
            </div>
 
        </div>
        <div className="mv4 mv0-ns">
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
                <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="currentColor"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280 320-200v-80L480-520 160-720v80l320 200Z"/></svg>
            </a>
            
            {/* Twitter */}
            {/* <a
                className={footerIconsClasses}
                href="https://twitter.com/cmdalbem">
                <svg xmlns="http://www.w3.org/2000/svg" fill='currentColor' viewBox="0 0 30 30" width="30px" height="30px">    <path d="M28,6.937c-0.957,0.425-1.985,0.711-3.064,0.84c1.102-0.66,1.947-1.705,2.345-2.951c-1.03,0.611-2.172,1.055-3.388,1.295 c-0.973-1.037-2.359-1.685-3.893-1.685c-2.946,0-5.334,2.389-5.334,5.334c0,0.418,0.048,0.826,0.138,1.215 c-4.433-0.222-8.363-2.346-10.995-5.574C3.351,6.199,3.088,7.115,3.088,8.094c0,1.85,0.941,3.483,2.372,4.439 c-0.874-0.028-1.697-0.268-2.416-0.667c0,0.023,0,0.044,0,0.067c0,2.585,1.838,4.741,4.279,5.23 c-0.447,0.122-0.919,0.187-1.406,0.187c-0.343,0-0.678-0.034-1.003-0.095c0.679,2.119,2.649,3.662,4.983,3.705 c-1.825,1.431-4.125,2.284-6.625,2.284c-0.43,0-0.855-0.025-1.273-0.075c2.361,1.513,5.164,2.396,8.177,2.396 c9.812,0,15.176-8.128,15.176-15.177c0-0.231-0.005-0.461-0.015-0.69C26.38,8.945,27.285,8.006,28,6.937z"/></svg>
            </a> */}
        </div>
    </div>
)

export default Footer
