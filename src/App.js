import "./App.css";

import { Header } from "layouts/Header";
import { Footer } from "layouts/Footer";
import  routes  from "utils/routes";
import { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LandingAnimation} from 'layouts/LandingAnimation';
import { SignIn } from "components/SignIn/SignIn";
import { Signout} from "components/Signout";
import { GetCallDialog } from "components/GetCallDialog";

import { gapi } from 'gapi-script';

import { useDispatch } from 'react-redux';
import { setProfile , setAccessToken, setLoggedWith } from 'store/authReducer';
import Cookies from 'universal-cookie';

import {fetchUserInfoGmail, fetchUserInfoPhone} from 'services';

const clientId = "168422788818-78dbsq38j1upflihl0p2iu3hueipsmv6.apps.googleusercontent.com"






function App() {
  const headerRef = useRef(null);
  var [fadeActive, setFadeActive] = useState(true);

  const dispatch = useDispatch();

  function fadeClick() {
    if (headerRef.current) {
      headerRef.current.burgerClick();
    }
    // navList.classList.toggle("nav-active");
    // fade.classList.toggle("fade-active");
  
    setFadeActive("");
  }
  

  useEffect( ()=>{
    const cookies = new Cookies();
    if(cookies.get('authentication')){
      if(cookies.get('authentication') === 'success'){
        dispatch(setAccessToken(cookies.get('accessToken')))
        if(cookies.get('loggedWith')){
          dispatch(setLoggedWith(cookies.get('loggedWith')))
          if(cookies.get('loggedWith') === 'google'){
            let user = {
              access_token : cookies.get('accessToken')
            }
            fetchUserInfoGmail(user)
              .then((data)=>{
                dispatch(setProfile(data))
                console.log('Welcome '+ data.name);
              })
              .catch((e)=>{
                console.log(e);
              });
          }
          if(cookies.get('loggedWith') === 'phoneNumber'){
            let user = {
              access_token  : cookies.get('accessToken')
            }
            fetchUserInfoPhone(user)
              .then((data)=>{
                let profileData ={
                  'email' : "NA",
                  'name'  : "NA",
                  'phoneNumber' : data,
                  'picture' : "NA",
                  'verified_email' : "NA",
                  'loggedWith' : "phoneNumber"
                }
                dispatch(setProfile(profileData))
                console.log('Welcome '+ data);
              })
              .catch((e)=>{
                console.log(e);
              });
          }
        }
      }
    }
    function start(){
      gapi.auth2.init({
        clientId : clientId,
        scope: ""
      })
    
    }
    gapi.load('client:auth2', start)
  },[dispatch])
  
  return (
    <div>
      <BrowserRouter>
        <LandingAnimation/>
        
        
        <div className="main">
          <Header ref={headerRef} setFade={setFadeActive}></Header>
          
            <Routes>
              {routes.map((route,index) =>{
                return <Route path={route.path} key={index} exact={route.exact} element={route.component}/>
              })}
            </Routes>
            <SignIn username="varun" status={fadeActive} /> 
            <Signout/>
            <GetCallDialog/>
          <Footer></Footer>

          <button className={`fade1 ${fadeActive}`} onClick={fadeClick} ></button>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
