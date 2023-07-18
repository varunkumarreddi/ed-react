import CarouselCards from './CarouselCards';
import React, { useEffect, useState } from 'react';
import endpoints from '../constants/endpoints';
import configData from '../constants/configData';
import axios from 'axios';

function ImageCards() {
  const [latestDesignsData, setLatestDesignsData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestDesigns();
  }, []);

  async function fetchLatestDesigns() {
    setLoading(true);
    try {
      await axios
        .get(configData.SERVER_URL + endpoints.LATESTDESIGNS)
        .then((res) => res.data)
        .then((data) => {
          setLatestDesignsData(data);
          setLoading(false);
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="card-slides">
      {loading && <p>Loading...</p>}

      {!loading &&
        latestDesignsData.map((category, index) => {
          return (
            <CarouselCards category={category} key={index} index={index} />
          );
        })}
    </div>
  );
}

export default ImageCards;
