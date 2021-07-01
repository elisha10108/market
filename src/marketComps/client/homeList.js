import React from 'react';
import LazyLoad from 'react-lazyload';
import HomeCatList from './homeCatList';


function Homelist(props) {
  const orderCategoriesId = ["3", "1", "2", "5"]


  return (

    <div className="container-fluid">
      <div className="container">
        {orderCategoriesId.map(item => {
          return (
            <LazyLoad  key={item} height={500}>
              <HomeCatList catId={item} />
            </LazyLoad>
          )
        })}

      
      </div>
    </div>

  )
}

export default Homelist