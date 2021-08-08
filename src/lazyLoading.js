import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { doApiGet } from './services/apiSer';

function LazyLoading(){
  let [ar,setAr] = useState([])

  useEffect(() => {
    return doApi();
  },[]);

  const doApi = async() => {
    let url = "https://pixabay.com/api/?key=15489555-318fcca1200a48f374a1ce3ea&q=yellow+flowers&image_type=photo&pretty=true";
    let data = await doApiGet(url);

    setAr(data.hits);
  }

  return(
    <div className="container">
      <h2>Gallery of images:</h2>
      <div className="row">
        {ar.map(item => {
          return(
            <div key={item.id} className="col-lg-6 p-3">

              <LazyLoad height={200} offset={100}>
              <img alt={"im"} src={item?.largeImageURL} className="shadow img-thumbnail w-100"/>
              </LazyLoad>
            </div>
          )
        })}
      </div>
    </div> 
  )
}

export default LazyLoading