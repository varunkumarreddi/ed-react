import {CarouselCards} from "components/CarouselCards";
import React from 'react'



export function ImageCards(props) {

  return (
    <div className="card-slides">
      {props.latestDesignsData.map((category,index)=> {
      return (
        <CarouselCards category={category} key={index} index={index}/>
        )
      })} 
    </div>
  );
}
