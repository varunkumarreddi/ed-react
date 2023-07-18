import './App.css';
import { gsap } from 'gsap';
import { useEffect, useState, useRef } from 'react';
import ImageCards from './components/ImageCards';

function App() {
  var [navActive, setNavActive] = useState('');
  var [fadeActive, setFadeActive] = useState('');
  var [toggleClass, setToggleClass] = useState('');

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power1.out' } });

    tl.to('.text', { y: '0%', duration: 1.2, stagger: 0.25, delay: 2.8 })
      .fromTo('.intro', { opacity: 1 }, { opacity: 0, duration: 1 })
      .fromTo('.home', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=0.2')
      .to('.landing', { y: '-100%', duration: 0 });

    return () => tl.kill();
  }, []);

  const navLinks = useRef(null);

  //toggle Nav1

  function burgerClick() {
    // navList.classList.toggle("nav-active");
    // fade.classList.toggle("fade-active");

    navActive ? setNavActive('') : setNavActive('nav-active');
    fadeActive ? setFadeActive('') : setFadeActive('fade1-active');
    //Animate Links
    const linksList = navLinks.current.children;
    for (var i = 0; i < linksList.length; i++) {
      if (linksList[i].style.animation) {
        linksList[i].style.animation = '';
      } else {
        linksList[i].style.animation = `navListFade 0.5s ease forwards ${
          i / 7
        }s`;
      }
    }

    //Burger animation
    toggleClass ? setToggleClass('') : setToggleClass('toggle');
  }

  function fadeClick() {
    // navList.classList.toggle("nav-active");
    // fade.classList.toggle("fade-active");

    setNavActive('');
    setFadeActive('');
    setToggleClass('');

    const linksList = navLinks.current.children;
    for (var i = 0; i < linksList.length; i++) {
      if (linksList[i].style.animation) {
        linksList[i].style.animation = '';
      } else {
        linksList[i].style.animation = `navListFade 0.5s ease forwards ${
          i / 7
        }s`;
      }
    }
  }

  return (
    <div>
      <div className="main">
        <div className="landing">
          <svg
            id="title"
            width="30%"
            height="40%"
            viewBox="0 0 850 79"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="path-1-outside-1_1:7"
              maskUnits="userSpaceOnUse"
              x="0.391998"
              y="0.223999"
              width="849"
              height="79"
              fill="black"
            >
              <rect
                fill="white"
                x="0.391998"
                y="0.223999"
                width="849"
                height="79"
              />
              <path d="M14.128 13.192V35.56H38.512V42.76H14.128V65.8H41.392V73H5.392V5.992H41.392V13.192H14.128Z" />
              <path d="M95.7948 6.088V13.192H77.5547V73H68.8187V13.192H50.4827V6.088H95.7948Z" />
              <path d="M158.1 6.088V73H149.364V42.664H115.284V73H106.548V6.088H115.284V35.464H149.364V6.088H158.1Z" />
              <path d="M181.753 13.192V35.56H206.137V42.76H181.753V65.8H209.017V73H173.017V5.992H209.017V13.192H181.753Z" />
              <path d="M257.468 73L241.532 45.64H230.972V73H222.236V6.088H243.836C248.892 6.088 253.148 6.952 256.604 8.68C260.124 10.408 262.748 12.744 264.476 15.688C266.204 18.632 267.068 21.992 267.068 25.768C267.068 30.376 265.724 34.44 263.036 37.96C260.412 41.48 256.444 43.816 251.132 44.968L267.932 73H257.468ZM230.972 38.632H243.836C248.572 38.632 252.124 37.48 254.492 35.176C256.86 32.808 258.044 29.672 258.044 25.768C258.044 21.8 256.86 18.728 254.492 16.552C252.188 14.376 248.636 13.288 243.836 13.288H230.972V38.632Z" />
              <path d="M289.378 13.192V35.56H313.762V42.76H289.378V65.8H316.642V73H280.642V5.992H316.642V13.192H289.378Z" />
              <path d="M369.413 58.12H340.229L334.853 73H325.637L349.829 6.472H359.909L384.005 73H374.789L369.413 58.12ZM366.917 51.016L354.821 17.224L342.725 51.016H366.917Z" />
              <path d="M403.284 65.896H426.708V73H394.548V6.088H403.284V65.896Z" />
              <path d="M482.411 6.088C489.708 6.088 496.012 7.464 501.324 10.216C506.7 12.904 510.796 16.776 513.612 21.832C516.492 26.888 517.931 32.84 517.931 39.688C517.931 46.536 516.492 52.488 513.612 57.544C510.796 62.536 506.7 66.376 501.324 69.064C496.012 71.688 489.708 73 482.411 73H461.579V6.088H482.411ZM482.411 65.8C491.052 65.8 497.644 63.528 502.188 58.984C506.732 54.376 509.004 47.944 509.004 39.688C509.004 31.368 506.699 24.872 502.091 20.2C497.547 15.528 490.988 13.192 482.411 13.192H470.315V65.8H482.411Z" />
              <path d="M538.19 13.192V35.56H562.574V42.76H538.19V65.8H565.454V73H529.454V5.992H565.454V13.192H538.19Z" />
              <path d="M599.889 73.672C595.473 73.672 591.505 72.904 587.985 71.368C584.529 69.768 581.809 67.592 579.825 64.84C577.841 62.024 576.817 58.792 576.753 55.144H586.065C586.385 58.28 587.665 60.936 589.905 63.112C592.209 65.224 595.537 66.28 599.889 66.28C604.049 66.28 607.313 65.256 609.681 63.208C612.113 61.096 613.329 58.408 613.329 55.144C613.329 52.584 612.625 50.504 611.217 48.904C609.809 47.304 608.049 46.088 605.937 45.256C603.825 44.424 600.977 43.528 597.393 42.568C592.977 41.416 589.425 40.264 586.737 39.112C584.113 37.96 581.841 36.168 579.921 33.736C578.065 31.24 577.137 27.912 577.137 23.752C577.137 20.104 578.065 16.872 579.921 14.056C581.777 11.24 584.369 9.064 587.697 7.528C591.089 5.992 594.961 5.224 599.313 5.224C605.585 5.224 610.705 6.792 614.673 9.928C618.705 13.064 620.977 17.224 621.489 22.408H611.889C611.569 19.848 610.225 17.608 607.857 15.688C605.489 13.704 602.353 12.712 598.449 12.712C594.801 12.712 591.825 13.672 589.521 15.592C587.217 17.448 586.065 20.072 586.065 23.464C586.065 25.896 586.737 27.88 588.081 29.416C589.489 30.952 591.185 32.136 593.169 32.968C595.217 33.736 598.065 34.632 601.713 35.656C606.129 36.872 609.681 38.088 612.369 39.304C615.057 40.456 617.361 42.28 619.281 44.776C621.201 47.208 622.161 50.536 622.161 54.76C622.161 58.024 621.297 61.096 619.569 63.976C617.841 66.856 615.281 69.192 611.889 70.984C608.497 72.776 604.497 73.672 599.889 73.672Z" />
              <path d="M643.753 6.088V73H635.017V6.088H643.753Z" />
              <path d="M709.33 25.48C707.474 21.576 704.786 18.568 701.266 16.456C697.746 14.28 693.65 13.192 688.978 13.192C684.306 13.192 680.082 14.28 676.306 16.456C672.594 18.568 669.65 21.64 667.474 25.672C665.362 29.64 664.306 34.248 664.306 39.496C664.306 44.744 665.362 49.352 667.474 53.32C669.65 57.288 672.594 60.36 676.306 62.536C680.082 64.648 684.306 65.704 688.978 65.704C695.506 65.704 700.882 63.752 705.106 59.848C709.33 55.944 711.794 50.664 712.498 44.008H685.81V36.904H721.81V43.624C721.298 49.128 719.57 54.184 716.626 58.792C713.682 63.336 709.81 66.952 705.01 69.64C700.21 72.264 694.866 73.576 688.978 73.576C682.77 73.576 677.106 72.136 671.986 69.256C666.866 66.312 662.802 62.248 659.794 57.064C656.85 51.88 655.378 46.024 655.378 39.496C655.378 32.968 656.85 27.112 659.794 21.928C662.802 16.68 666.866 12.616 671.986 9.736C677.106 6.792 682.77 5.32 688.978 5.32C696.082 5.32 702.354 7.08 707.794 10.6C713.298 14.12 717.298 19.08 719.794 25.48H709.33Z" />
              <path d="M785.969 73H777.233L742.097 19.72V73H733.361V5.992H742.097L777.233 59.176V5.992H785.969V73Z" />
            </mask>
            <path
              d="M14.128 13.192V35.56H38.512V42.76H14.128V65.8H41.392V73H5.392V5.992H41.392V13.192H14.128Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M95.7948 6.088V13.192H77.5547V73H68.8187V13.192H50.4827V6.088H95.7948Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M158.1 6.088V73H149.364V42.664H115.284V73H106.548V6.088H115.284V35.464H149.364V6.088H158.1Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M181.753 13.192V35.56H206.137V42.76H181.753V65.8H209.017V73H173.017V5.992H209.017V13.192H181.753Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M257.468 73L241.532 45.64H230.972V73H222.236V6.088H243.836C248.892 6.088 253.148 6.952 256.604 8.68C260.124 10.408 262.748 12.744 264.476 15.688C266.204 18.632 267.068 21.992 267.068 25.768C267.068 30.376 265.724 34.44 263.036 37.96C260.412 41.48 256.444 43.816 251.132 44.968L267.932 73H257.468ZM230.972 38.632H243.836C248.572 38.632 252.124 37.48 254.492 35.176C256.86 32.808 258.044 29.672 258.044 25.768C258.044 21.8 256.86 18.728 254.492 16.552C252.188 14.376 248.636 13.288 243.836 13.288H230.972V38.632Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M289.378 13.192V35.56H313.762V42.76H289.378V65.8H316.642V73H280.642V5.992H316.642V13.192H289.378Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M369.413 58.12H340.229L334.853 73H325.637L349.829 6.472H359.909L384.005 73H374.789L369.413 58.12ZM366.917 51.016L354.821 17.224L342.725 51.016H366.917Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M403.284 65.896H426.708V73H394.548V6.088H403.284V65.896Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M482.411 6.088C489.708 6.088 496.012 7.464 501.324 10.216C506.7 12.904 510.796 16.776 513.612 21.832C516.492 26.888 517.931 32.84 517.931 39.688C517.931 46.536 516.492 52.488 513.612 57.544C510.796 62.536 506.7 66.376 501.324 69.064C496.012 71.688 489.708 73 482.411 73H461.579V6.088H482.411ZM482.411 65.8C491.052 65.8 497.644 63.528 502.188 58.984C506.732 54.376 509.004 47.944 509.004 39.688C509.004 31.368 506.699 24.872 502.091 20.2C497.547 15.528 490.988 13.192 482.411 13.192H470.315V65.8H482.411Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M538.19 13.192V35.56H562.574V42.76H538.19V65.8H565.454V73H529.454V5.992H565.454V13.192H538.19Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M599.889 73.672C595.473 73.672 591.505 72.904 587.985 71.368C584.529 69.768 581.809 67.592 579.825 64.84C577.841 62.024 576.817 58.792 576.753 55.144H586.065C586.385 58.28 587.665 60.936 589.905 63.112C592.209 65.224 595.537 66.28 599.889 66.28C604.049 66.28 607.313 65.256 609.681 63.208C612.113 61.096 613.329 58.408 613.329 55.144C613.329 52.584 612.625 50.504 611.217 48.904C609.809 47.304 608.049 46.088 605.937 45.256C603.825 44.424 600.977 43.528 597.393 42.568C592.977 41.416 589.425 40.264 586.737 39.112C584.113 37.96 581.841 36.168 579.921 33.736C578.065 31.24 577.137 27.912 577.137 23.752C577.137 20.104 578.065 16.872 579.921 14.056C581.777 11.24 584.369 9.064 587.697 7.528C591.089 5.992 594.961 5.224 599.313 5.224C605.585 5.224 610.705 6.792 614.673 9.928C618.705 13.064 620.977 17.224 621.489 22.408H611.889C611.569 19.848 610.225 17.608 607.857 15.688C605.489 13.704 602.353 12.712 598.449 12.712C594.801 12.712 591.825 13.672 589.521 15.592C587.217 17.448 586.065 20.072 586.065 23.464C586.065 25.896 586.737 27.88 588.081 29.416C589.489 30.952 591.185 32.136 593.169 32.968C595.217 33.736 598.065 34.632 601.713 35.656C606.129 36.872 609.681 38.088 612.369 39.304C615.057 40.456 617.361 42.28 619.281 44.776C621.201 47.208 622.161 50.536 622.161 54.76C622.161 58.024 621.297 61.096 619.569 63.976C617.841 66.856 615.281 69.192 611.889 70.984C608.497 72.776 604.497 73.672 599.889 73.672Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M643.753 6.088V73H635.017V6.088H643.753Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M709.33 25.48C707.474 21.576 704.786 18.568 701.266 16.456C697.746 14.28 693.65 13.192 688.978 13.192C684.306 13.192 680.082 14.28 676.306 16.456C672.594 18.568 669.65 21.64 667.474 25.672C665.362 29.64 664.306 34.248 664.306 39.496C664.306 44.744 665.362 49.352 667.474 53.32C669.65 57.288 672.594 60.36 676.306 62.536C680.082 64.648 684.306 65.704 688.978 65.704C695.506 65.704 700.882 63.752 705.106 59.848C709.33 55.944 711.794 50.664 712.498 44.008H685.81V36.904H721.81V43.624C721.298 49.128 719.57 54.184 716.626 58.792C713.682 63.336 709.81 66.952 705.01 69.64C700.21 72.264 694.866 73.576 688.978 73.576C682.77 73.576 677.106 72.136 671.986 69.256C666.866 66.312 662.802 62.248 659.794 57.064C656.85 51.88 655.378 46.024 655.378 39.496C655.378 32.968 656.85 27.112 659.794 21.928C662.802 16.68 666.866 12.616 671.986 9.736C677.106 6.792 682.77 5.32 688.978 5.32C696.082 5.32 702.354 7.08 707.794 10.6C713.298 14.12 717.298 19.08 719.794 25.48H709.33Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
            <path
              d="M785.969 73H777.233L742.097 19.72V73H733.361V5.992H742.097L777.233 59.176V5.992H785.969V73Z"
              stroke="black"
              strokeWidth="10"
              mask="url(#path-1-outside-1_1:7)"
            />
          </svg>
          <div className="intro">
            <div className="intro-text">
              <h1 className="hide">
                <span className="text">Designing</span>
              </h1>
              <h1 className="hide">
                <span className="text">Beautiful Spaces</span>
              </h1>
              <h1 className="hide">
                <span className="text">Everywhere</span>
              </h1>
            </div>
          </div>
        </div>
        <h1 className="visuallyhidden">Ethereal Design</h1>
        <div className="home">
          <nav>
            <div className="logo"></div>
            <ul className={`navlist ${navActive}`} ref={navLinks}>
              <li>
                <a href="https://www.google.co.in/?client=safari">Home</a>
              </li>
              <li>
                <a href="https://www.google.co.in/?client=safari">Categories</a>
              </li>
              <li>
                <a href="https://www.google.co.in/?client=safari">Works</a>
              </li>
              <li>
                <a href="https://www.google.co.in/?client=safari">Contact Us</a>
              </li>
            </ul>
            <button className={`burger ${toggleClass}`} onClick={burgerClick}>
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </button>
          </nav>
          <div className="content">
            <div className="cover">
              <div className="cover-heading">
                <div className="cover-text">
                  Let our homes make our life Beautiful
                </div>
                <div className="contactLinks">
                  <a
                    href="https://api.whatsapp.com/send?phone=8437088566"
                    className="floatCt Wat"
                  >
                    Chat with Us <i className="fa fa-whatsapp"></i>
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=8437088566"
                    className="floatCt Call"
                  >
                    Get a Call <i className="fa fa-phone"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="cards-container">
              <div className="cards-title">
                Get the best design with in your budget
              </div>
              <h2 className="cards-heading">Our Latest Designs</h2>
              <ImageCards></ImageCards>
              <div className="links-section">
                <div className="info-link sigin-long-text">
                  <a href="https://www.google.com">
                    Sign In to whishlist your favourite designs and to see the
                    quotation ›
                  </a>
                </div>
                <div className="info-link">
                  <a href="https://www.google.com">Explore more ›</a>
                </div>
              </div>
            </div>

            <div className="interactive-section">
              <div className="flex-interactive">
                <img
                  className="interactive-image"
                  src="https://images.pexels.com/photos/5490356/pexels-photo-5490356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Image1"
                />
                <div className="design-info">
                  <h2>We Design According to Your Space</h2>
                  <h2>We Design According to Your Need</h2>
                </div>
                <img
                  className="interactive-image"
                  src="https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg"
                  alt="Image1"
                />
              </div>
              <div className="flex-interactive-contactLinks">
                <a
                  href="https://api.whatsapp.com/send?phone=8437088566"
                  className="floatCt Wat"
                >
                  Chat with Us <i className="fa fa-whatsapp"></i>
                </a>
                <h3>Your Dream House is Just a Click Away</h3>
                <a
                  href="https://api.whatsapp.com/send?phone=8437088566"
                  className="floatCt Call"
                >
                  Get a Call <i className="fa fa-phone"></i>
                </a>
              </div>
            </div>
            <div className="footer">
              <p className="cp-text">
                © Copyright 2023 Ethereal Designs. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <button className={`fade1 ${fadeActive}`} onClick={fadeClick}></button>
    </div>
  );
}

export default App;