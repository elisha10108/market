import React from 'react';
import {useApiHook} from "./hooks/apiHook"

function ApiWithHook(props){
  let [items] = useApiHook("http://fs1.co.il/bus/bitcoin.php");


  return(
    <div>ApiWithHook work
      {items.map(item => {
        return(
          <div>
            {item.name}
          </div>
        )
      })}
    </div> 
  )
}

export default ApiWithHook