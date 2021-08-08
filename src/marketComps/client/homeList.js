import React from 'react';
import LazyLoad from 'react-lazyload';
import HomeCatList from './homeCatList';
// import {URL_API,doApiGet} from "../../services/apiSer";

function Homelist() {
  const orderCategoriesId = ["9", "1", "8"]

    // let [catS_id,setCatS_id]=useState();
// let data;

    // useEffect(()=>{
    //     doapi();
    // },[])
    //
    // const doapi= async ()=>{
    //     let url = URL_API+"/categories/gets_id"
    //      data = await doApiGet(url);
    //     console.log(data)
    //     console.log(data[2].s_id)
    // }

  return (

      <div className="container-fluid">
          <div className="container">
              {orderCategoriesId .map((item ,i)=> {
                return (
                    <LazyLoad  key={item} height={500}>
                      <HomeCatList key={i}  catId={item} />
                    </LazyLoad>
                )
              })}


          </div>
      </div>

  )
}

export default Homelist















