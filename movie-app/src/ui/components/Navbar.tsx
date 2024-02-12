
export const Navbar = () => {
  return (
    <>
    
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-md-3" data-bs-theme="dark">
        <div className="container">
            
            <a className="navbar-brand" href="#">MovieApp</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="#">Movies</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">TV Shows</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    </>
  )
}
