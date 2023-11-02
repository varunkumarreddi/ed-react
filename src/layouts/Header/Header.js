import React,{useState , useRef, useImperativeHandle, forwardRef} from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import LoginIcon from '@mui/icons-material/Login';

import { setShowSignIn, setShowSignOut } from 'store/modalReducer';

export const Header = forwardRef((props, ref) => {
    const dispatch = useDispatch();
    const navLinks = useRef(null);
    const {profile} = useSelector(state=> state.authReducer) 

    var [navActive, setNavActive] = useState("");
    var [toggleClass, setToggleClass] = useState("");
    

    useImperativeHandle(ref, () => ({ burgerClick }));


    const burgerClick = () =>{
        // navList.classList.toggle("nav-active");
        // fade.classList.toggle("fade-active");
        
        navActive ? setNavActive("") : setNavActive("nav-active");
        
        //Animate Links
        const linksList = navLinks.current.children;
        for (var i = 0; i < linksList.length; i++) {
          if (linksList[i].style.animation) {
            linksList[i].style.animation = "";
          } else {
            linksList[i].style.animation = `navListFade 0.5s ease forwards ${i / 7}s`;
          }
        }
    
        //Burger animation
        toggleClass ? setToggleClass("") : setToggleClass("toggle");

        if(toggleClass === "toggle"){
            props.setFade("");
        }
        else if(toggleClass === ""){
            props.setFade("fade1-active");
        }
    }

    function showSignIn(){
        dispatch(setShowSignIn(true))
    }

    function showSignOut(){
        dispatch(setShowSignOut(true))
    }

    return (
        
        <nav>
            <a className="logo" href='/'><i></i></a>
            <ul className={`navlist ${navActive}`} ref={navLinks}>
                <li>
                <NavLink to="/home" className={({ isActive }) => isActive ? "disabled-link" : ""}>Home</NavLink>
                </li>
                <li>
                <NavLink to="/weOffer" className={({ isActive }) => isActive ? "disabled-link" : ""}>We Offer</NavLink>
                </li>
                <li>
                <NavLink to="/ourWork" className={({ isActive }) => isActive ? "disabled-link" : ""}>Our Work</NavLink>
                </li>
                <li>
                {profile ?  <NavLink to="#" onClick={showSignOut}>Sign Out <span><LoginIcon/></span></NavLink>
                    : <NavLink to="#" onClick={showSignIn}>Sign In <span><LoginIcon/></span></NavLink> 
                }
                </li>
            </ul>
            <button className={`burger ${toggleClass}`} onClick={burgerClick}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </button>
        </nav>
        
        
    )
})



