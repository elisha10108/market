import React, { useEffect, useState } from 'react';
import LazyLoad from 'react-lazyload';
import { doApiGet } from '../services/apiSer';

function LazyLoading(props){
  let [ar,setAr] = useState([])

  useEffect(() => {
    doApi();
  },[]);

  const doApi = async() => {
    let url = "https://pixabay.com/api/?key=15489555-318fcca1200a48f374a1ce3ea&q=yellow+flowers&image_type=photo&pretty=true";
    let data = await doApiGet(url);
    console.log(data.hits);
    setAr(data.hits);
  }

  return(
    <div className="container">
      <h2>Gallery of images:</h2>
      <div className="row">
        {ar.map(item => {
          return(
            <div key={item.id} className="col-lg-6 p-3">
              {/* דואג שברגע שמגיעים לאזור רק יציג את התמונה */}
              <LazyLoad height={200} offset={100}>
              <img src={item.largeImageURL} className="shadow img-thumbnail w-100"/>
              </LazyLoad>
            </div>
          )
        })}
      </div>
    </div> 
  )
}

export default LazyLoading