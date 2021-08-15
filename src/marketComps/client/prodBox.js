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
  let flag =useSelector(mystore => mystore.flagP)

  let item = props.item;

  useEffect(() => {
    carts_ar?.map((prodItem) => {
      if(prodItem._id === item._id){
          setCountProd(prodItem.count);
        }
      })

  },[carts_ar,item._id])

  const addProd = () => {
    if(item.qty >= countProd+0.500){
      setCountProd(countProd+0.500);
      item.count = countProd+0.500;
      dispatch({type:"UPDATE_THE_CART", item:item})
    }

    if(item.qty >= countProd+1){
      if(item.type ===1){
        setCountProd(countProd+0.500);
        item.count = countProd+0.500;
        dispatch({type:"UPDATE_THE_CART", item:item})
      }
      if(item.type ===3){
        if(Color === "btn btn-info"){
          setCountProd(countProd+1);
          item.count = countProd+1;
          dispatch({type:"UPDATE_THE_CART", item:item})
              }if (Color === "btn btn-success"){
          setCountProd(countProd+0.500);
          item.count = countProd+0.500;
          dispatch({type:"UPDATE_THE_CART", item:item})
        }
      }
      if(item.type ===2){
        setCountProd(countProd+1);
        item.count = countProd+1;
        dispatch({type:"UPDATE_THE_CART", item:item})
      }

  }
   
  }

  const reduceProd = () => {
    if(countProd > 0){
      if(item.type ===1){
        setCountProd(countProd-0.500);
        item.count = countProd-0.500;
        dispatch({type:"UPDATE_THE_CART", item:item})
      }


      if(item.type ===3){
        if(countProd === 0.500){
          setCountProd(countProd-0.500);
          item.count = countProd-0.500;
        }
        if(countProd !== 0.500) {
          if (Color === "btn btn-info") {
            setCountProd(countProd - 1);
            item.count = countProd - 1;
          }
          if (Color === "btn btn-success") {
            setCountProd(countProd - 0.500);
            item.count = countProd - 0.500;
          }
        }
      }


      if(item.type ===2){
        setCountProd(countProd-1);
        item.count = countProd-1;
        dispatch({type:"UPDATE_THE_CART",  item:item})
      }
    }

    dispatch({type:"UPDATE_THE_CART", item:item})
  }


 const myButton = () => {
    if(item.type ===3){
   if(!isGreen){
     setIsGreen(true)
     setColor("btn btn-success")
     setWord("משקל")
     dispatch({type:"UPDATE_FLAG",flag:true})
     console.log(flag);
   }
   else{
     setIsGreen(false)
     setColor("btn btn-info")
     setWord("יחידה")
     dispatch({type:"UPDATE_FLAG",flag:false})
   }
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

        {item.type ===3 ? <button className={`${Color} rounded-pill`} onClick={ myButton }>{word}</button>:""}
        {item.type ===2 ? <button className={`btn btn-secondary rounded-pill`} >יחידה</button>:""}
        {item.type ===1 ?  <button className={`btn btn-secondary rounded-pill`} >משקל</button>:""}

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