interface CarouselProps {
  title: string,
  moviesArray: object[]
}


export const Carousel: React.FC<CarouselProps> = ({ title , moviesArray }) => {
  return (
    <>
      <section className="carousel-section">
        <div className="container">
          <h2>{ title }</h2>
        </div>
      </section>
    </>
  )
}
