import React from 'react';
import {Link} from "react-router-dom";
import {useHistory} from "react-router-dom"


function HeaderAdmin() {
  let history = useHistory();

  const logOut = () => {
    localStorage.removeItem("tok");
    history.push("/admin")
  }


  return (
    <div className="container-fluid bg-dark text-light">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-3">
            <h2>Admin market</h2>
          </div>
          <div className="col-lg-6 text-end">
  

            {localStorage["tok"] ? 
            <React.Fragment>
              <Link to="#" onClick={logOut} className="text-white h5">Log out</Link>
            </React.Fragment>
            : ""
          }
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderAdmin;