import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import errorMessages from 'constants/errorMessages';

import { ImageCards } from "components/ImageCards";
import { ErrorDialog } from 'components/ErrorDialog';
import RingLoader from "react-spinners/RingLoader";


import { setLatestDesigns,setIsLoading,setIsError } from 'store/homeReducer';

import {fetchLatestDesigns} from 'services';


import { setShowGetCallDialog } from 'store/modalReducer';


export function Home() {
  const dispatch = useDispatch();

  const loading = useSelector(state=>state.homeReducer.isLoading) ;
  const error = useSelector(state=>state.homeReducer.isError) ;
  const latestDesignsData = useSelector(state=>state.homeReducer.latestDesigns) ;
  
  const showGetCallDialog = ()=>{
    dispatch(setShowGetCallDialog(true))
  }
  

  useEffect(()=>{
      fetchLatestDesigns()
        .then((data)=>{
          dispatch(setLatestDesigns(data));
          dispatch(setIsLoading(false))
        })
        .catch((e)=>{
          dispatch(setIsLoading(false))
          dispatch(setIsError(errorMessages.ERROR_FETCH_LATESTDESIGNS))
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
        <div className="home">
        {loading && <div className='spinner'><RingLoader color='#36d7b7' size='100px'/></div>}

        {error.length>0 && <ErrorDialog errorMessage={error}/>}

        {!loading && error.length<1 &&
          <div className="content">
            <div className="cover">
              <div className="cover-heading">
                <div className="cover-text">Let our homes make our life Beautiful</div>
                <div className="contactLinks">
                  <a href="https://api.whatsapp.com/send?phone=8437088566" className="floatCt Wat">
                    Chat with Us <i className="fa fa-whatsapp"></i>
                  </a>
                  <button className="floatCt Call" onClick={showGetCallDialog}>
                    Get a Call <i className="fa fa-phone"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="cards-container">
              <div className="cards-title">Get the best design with in your budget</div>
              <h2 className="cards-heading">Our Latest Designs</h2>
              <ImageCards latestDesignsData = {latestDesignsData}></ImageCards>
              <div className="links-section">
                {/* <div className="info-link sigin-long-text"><a  href="https://www.google.com">Sign In to whishlist your favourite designs and to see the quotation ›</a></div> */}
                <div className="info-link"><a  href="/weOffer">Explore more ›</a></div>
              </div>
            </div>

            <div className="interactive-section">
              <div className="flex-interactive">
                <img className="interactive-image" src="https://images.pexels.com/photos/5490356/pexels-photo-5490356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Image1" />
                <div className="design-info">
                  <h2 className='interactive-text'>We Design According to Your Space</h2>
                  <h2 className='interactive-text'>We Design According to Your Need</h2>
                </div>
                <img className="interactive-image" src="https://images.pexels.com/photos/2227832/pexels-photo-2227832.jpeg" alt="Image1" />
              </div>
              <div className="flex-interactive-contactLinks">
                  <a href="https://api.whatsapp.com/send?phone=8437088566" className="floatCt Wat">
                    <span className='wtap-text'>Chat with Us</span> <i className="fa fa-whatsapp contact-link"></i>
                  </a>
                  <h3 className='interactive-text'>Your Dream House is Just a Click Away</h3>
                  <button className="floatCt Call" onClick={showGetCallDialog}>
                    <span className='call-text'>Get a Call</span> <i className="fa fa-phone contact-link"></i>
                  </button>
                </div>
            </div>
          </div>
        }
        </div>
    
  )
}
