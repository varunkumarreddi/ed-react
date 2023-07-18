function CarouselCards({ category, index }) {
  return (
    <div className="img-card">
      <div
        id={'carouselExampleIndicators' + index}
        className="carousel carousel-fade slide"
        data-ride="carousel"
        data-interval="false"
      >
        <ol className="carousel-indicators">
          <li
            data-target={'#carouselExampleIndicators' + index}
            data-slide-to="0"
            className="active"
          ></li>
          <li
            data-target={'#carouselExampleIndicators' + index}
            data-slide-to="1"
          ></li>
          <li
            data-target={'#carouselExampleIndicators' + index}
            data-slide-to="2"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active ">
            <img
              className="card-img"
              src={category.images[0]}
              alt="First slide"
            />
          </div>
          <div className="carousel-item ">
            <img
              className="card-img"
              src={category.images[1]}
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="card-img"
              src={category.images[2]}
              alt="Third slide"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href={'#carouselExampleIndicators' + index}
          role="button"
          data-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href={'#carouselExampleIndicators' + index}
          role="button"
          data-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <a className="card-link" href="www.hello.com">
        {category.name} {'›'}
      </a>
    </div>
  );
}

export default CarouselCards;
