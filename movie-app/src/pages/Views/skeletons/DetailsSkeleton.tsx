import { CastSkeleton } from '.'
import './styles/CastSkeleton.css'


export const DetailsSkeleton = () => {
  return (
    <section className="container-fluid p-0 position-relative d-flex justify-content-center align-items-center" style={{height:'90vh'}}>
      {/* <div className="overlay-view col-12 position-absolute w-100 h-100"> </div> */}
      
      <div className="details-section container position-absolute w-100 h-100 mt-5">
      <div className="details-wrapper row position-relative gap-4 mb-5">
              <div className="img-container-view col-xs-12 col-md-5 col-lg-4 col-xl-3 p-0 mx-auto overflow-hidden">
                <div className="img-movie-view skeleton"></div>
              </div>

              <div className="col-xs-12 col-md-6 col-lg-7 col-xl-8">
                <div className='skeleton-text skeleton-title skeleton'></div>
                <div className="skeleton-text skeleton w-50"></div>

                <div className="d-flex gap-2 mb-3">
                    <div className="skeleton-text skeleton w-50 me-2"></div>
                    <div className="skeleton-text skeleton w-50 me-2"></div>
                    <div className="skeleton-text skeleton w-50 me-2"></div>
                </div>

                <div className="d-flex gap-2 mb-3 details-buttons my-3">
                  <div className= "circle-details p-3 d-flex justify-content-center align-items-center skeleton"></div>
                  <div className="d-flex justify-content-center align-items-center gap-3 button-trailer-container text-white w-100">
                    <div className= "p-3 play-trailer-button circle-details d-flex justify-content-center align-items-center skeleton">
                    </div>
                    <div className='skeleton-text skeleton'></div>
                  </div>
                
                </div>

                <div>
                  <div className="skeleton skeleton-text skeleton-subtitle mb-5"></div>
                  <div className="skeleton-text skeleton"></div>
                  <div className="skeleton-text skeleton skeleton-90"></div>
                  <div className="skeleton-text skeleton"></div>
                  <div className="skeleton-text skeleton skeleton-90"></div>
                  <div className="skeleton-text skeleton"></div>
                  <div className="skeleton-text skeleton skeleton-90"></div>

                  <div className="d-flex gap-3 mt-4">
                        <div className="skeleton-text skeleton"></div>
                        <div className="skeleton-text skeleton"></div>
                        <div className="skeleton-text skeleton"></div>
                  </div>
                </div>
                <hr />
                
                <div className="skeleton-text skeleton skeleton-30"></div>
                <hr />  
              </div>
            </div>  
            <CastSkeleton/>
      </div>
     
    </section>
  )
}
