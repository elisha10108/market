import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function CartItem(props){
  let dispatch = useDispatch();
  let item = props.item;

  useEffect(() => {
    item.name = item.name.length > 11 ? item.name.substr(0,10)+"..." : item.name ;
  },[props])

  const delFromCart = () => {
    item.count = item.count-item.count;
    dispatch({type:"UPDATE_THE_CART",item:item})
   
  }

  const addProd=()=>{
item.count=item.count+1;
dispatch({type:"UPDATE_THE_CART",item:item})
  }

  const reduceProd=()=>{
    item.count = item.count-1;
    dispatch({type:"UPDATE_THE_CART",item:item})
  }

  return(
    <div style={{borderBottom:"2px solid black"}} className="p-1">
      {item.name} : {item.count} , {item.price} Nis
    <span onClick={delFromCart} className="float-end text-danger">x</span>
    
      <span onClick={reduceProd} className="float ps-5 h3 text-danger">-</span>
      <span onClick={addProd} className="float  h4 p-1text-primary">+</span>
    
    </div> 
  )
}

export default CartItem