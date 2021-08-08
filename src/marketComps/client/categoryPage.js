import React, { useEffect,  useState } from 'react';
import { Link } from 'react-router-dom';

import { doApiGet, URL_API } from '../../services/apiSer';
import PageNav from '../misc/pagesNav';
import CartSide from './cartSide';
import Header from './header';
import ProdBox from './prodBox';

function CategoryPage(props) {
  let [cat, setCat] = useState({})
  let [prods_ar, setProdsAr] = useState([])





  useEffect(() => {

    doApi();

  }, [props.match])

  const doApi = async () => {
    let url1 = URL_API + "/categories/single/" + props.match.params.id
    let dataCat = await doApiGet(url1)
    setCat(dataCat)
    console.log(dataCat)
    let url = URL_API + `/prods/?cat=${dataCat.s_id}`

    let prodsData = await doApiGet(url);
    setProdsAr(prodsData);
  }



  return (
    <React.Fragment>
      <Header />
      <CartSide />
      <div className="container">
        <hr className="for_h2" />
        <h1 className="text-center h2_hr h2">
          <span>Product of {cat.name}</span>
        </h1>
        <div className="breadcrumb">
          <Link className="breadcrumb-item" to="/">Home</Link>
          <a className="breadcrumb-item active" href="#">{cat.name}</a>
        </div>
        <h3 className="text-center">{cat.info}</h3>
        <div className="text-center row">
          <div className="col-lg-6 text-center text-lg-start my-3 my-lg-0">
          {cat.s_id &&
            <PageNav
              urlPageApi={"/prods/count?cat=" + cat.s_id}
              perPage="8"
              pageLinkStart={"/cat/" + cat.s_id + "/"}
            />
          }
          </div>

        </div>
        {prods_ar.length === 0 && <div className="text-center"><img src="/public/images/loading.gif"  alt={"loading"}/></div>}
        <div className="row mb-5">
          {prods_ar.map(item => {
            return (
              <ProdBox key={item._id} item={item} />
            )
          })}
        </div>

      </div>

    </React.Fragment>
  )
}

export default CategoryPage