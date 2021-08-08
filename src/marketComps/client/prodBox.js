import React, { useEffect, useState } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import { URL_API } from '../../services/apiSer';

function ProdBox(props) {
  let dispatch = useDispatch();


  let [isGreen, setIsGreen] = useState(false)
  let[Color,setColor]= useState("btn btn-info")
  let [word,setWord]=useState("יחידה")
  let [countProd,setCountProd] = useState(0)
  let carts_ar = useSelector(mystore => mystore.carts_ar)

  let item = props.item;

  useEffect(() => {
    carts_ar.map(prodItem => {
        if(prodItem._id === item._id){
          setCountProd(prodItem.count);
        }
      })

  },[])






  const addProd = () => {
    if(item.qty >= countProd+1){
      if(item.type ==="kilogram"){
      setCountProd(countProd+0.500);
      item.count = countProd+0.500;
      dispatch({type:"UPDATE_THE_CART",item:item})
    }
      if(item.type ==="gram"){
        setCountProd(countProd+0.001);
        item.count = countProd+0.001;
        dispatch({type:"UPDATE_THE_CART",item:item})
      }
      if(item.type ==="singularity"){
        setCountProd(countProd+1);
        item.count = countProd+1;
        dispatch({type:"UPDATE_THE_CART",item:item})
      }

  }
  }

  const reduceProd = () => {
    if(countProd > 0){

      if(item.type ==="kilogram"){
        setCountProd(countProd-0.500);
        item.count = countProd-0.500;
        dispatch({type:"UPDATE_THE_CART",item:item})
      }
      if(item.type ==="gram"){
        setCountProd(countProd-0.001);
        item.count = countProd-0.001;
        dispatch({type:"UPDATE_THE_CART",item:item})
      }
      if(item.type ==="singularity"){
        setCountProd(countProd-1);
        item.count = countProd-1;
        dispatch({type:"UPDATE_THE_CART",item:item})
      }
    }
  }


 const myButton = () => {
   if(!isGreen){
     setIsGreen(true)
     setColor("btn btn-success")
     setWord("משקל")
   }
   else{
     setIsGreen(false)
     setColor("btn btn-info")
     setWord("יחידה")
   }
 }

 return (
    <LazyLoad height="200" className="col-lg-3 p-2 text-center">
      <div className="p-2 shadow pb-4" style={{height:"100%"}}>
        {(item.img.includes("http")) ?
        <div className="prod_img" style={{ backgroundImage: `url(${item.img})` }}>
        </div> :
        <div className="prod_img" style={{ backgroundImage: `url(${URL_API+ item.img})` }}>
    </div>
        }
        <h3>{item.name}</h3>

        {/*{Color}*/}
      <button className={`${Color} rounded-pill`} onClick={ myButton }>{word}</button>


        <div>₪   מחיר :   {item.price}  </div>
        {item.info?<div> עוד על הפריט : {item.info.substr(0, 50)}   </div>:""}



        <div className="my-3 d-flex justify-content-center align-items-center">
          <button className="btn btn-outline-success rounded-circle me-3" onClick={reduceProd}>-</button>
          <span className="h4 mt-1"> {countProd.toFixed(3)} </span>
          <button className="btn btn-outline-success rounded-circle ms-3" onClick={addProd} >+</button>
        </div>
        <Link to={"/single/"+item._id} className="text-success text-decoration-none">...לפרטים</Link>
      </div>
    </LazyLoad>
  )
}

export default ProdBox