import React from 'react';
import LazyLoad from 'react-lazyload';
import HomeCatList from './homeCatList';


function Homelist() {
  const orderCategoriesId = ["9", "1", "8"]



  return (

      <div className="container-fluid">
          <div className="container">
              {orderCategoriesId.map((item ,i)=> {
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















