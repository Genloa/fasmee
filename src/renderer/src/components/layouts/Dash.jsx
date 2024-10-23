function Dash({ children }) {
  return (
    <>
      <div className="container" width="100%">
        <div className="row">
          <div className="col">
            <img src="././src/img/icon.png" className=" bg-body mt-4" alt="..." width="80%" />
          </div>
          <div className="col-10">
            <nav className="navbar bg-body-tertiary mt-4 ">
              <div className="container-fluid">
                <form className="d-flex" role="search">
                  <input
                    className="form-control focus-ring focus-ring-danger border border-danger me-2"
                    type="search"
                    placeholder="Buscar"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-danger" type="submit">
                    Buscar
                  </button>
                </form>
              </div>
            </nav>
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasScrolling"
            aria-controls="offcanvasScrolling"
          >
            Enable body scrolling
          </button>

          <div
            className="offcanvas offcanvas-start"
            data-bs-scroll="true"
            data-bs-backdrop="false"
            tabIndex="-1"
            id="offcanvasScrolling"
            aria-labelledby="offcanvasScrollingLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasScrollingLabel">
                Offcanvas with body scrolling
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <p>Try scrolling the rest of the page to see this option in action.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dash
