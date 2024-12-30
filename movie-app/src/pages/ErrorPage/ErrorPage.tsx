import { useNavigate } from 'react-router-dom';
import errorImage from '/assets/404-logo.png';
import { ERROR_PAGE } from '../constants/ErrorPage.constants';

export const ErrorPage = () => {
  const navigate = useNavigate();  
  return (
      <section className="error-section d-flex justify-content-center align-items-center">
        <div className="container d-flex justify-content-center align-items-center flex-column py-4">
            <img src={errorImage} alt="error-image-404" className="error-image mb-3"/>
            <h1 className="error-title text-center mb-4">{ERROR_PAGE.TITLE}</h1>
            <h4 className="text-center mb-4">{ERROR_PAGE.DESCRIPTION}</h4>
            <button className='btn btn-primary' onClick={() => navigate('/')}>
              {ERROR_PAGE.GO_HOME_PAGE_BTN}
            </button>
        </div>
      </section>
  )
}
