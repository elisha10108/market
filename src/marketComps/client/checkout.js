import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import Header from './header';
import CartSide from './cartSide';
import AuthClient from './authClient';
import { doApiMethod, URL_API } from '../../services/apiSer';
import PayPalBtn from '../common/paypalBtn';
function Checkout(props) {
  let dispatch = useDispatch();
  let carts_ar = useSelector(myStore => myStore.carts_ar);
  let totalCart = 0;

  const checkoutReal = async(_id_paypalOrder = "00000") => {
    let obj = {
      carts_ar:JSON.stringify(carts_ar),
      total:totalCart,
      paypal_id:_id_paypalOrder
    }
    let url = URL_API+"/carts";
    try{
      let data = await doApiMethod(url,"POST",obj)
      if(data.n == 1){
        toast.success("Your order been updated")
      }
      else if(data._id){
        toast.success("Your order on process we will contact you soon to get your money!")
      }
      else{
        toast.error("there problem come back tommrow")
      }
    }
    catch(err){
      console.log(err);
      toast.error("there problem come back tommrow 222")
    }

  }

  const addProd = (item) => {
    item.count += 1;
    dispatch({type:"UPDATE_THE_CART",item:item})
  }

  const reduceProd = (item) => {
    if(item.count > 0){
      item.count -= 1;
      dispatch({type:"UPDATE_THE_CART",item:item})
    }
  }

  return (
    <React.Fragment>
      <AuthClient />
      <Header />
      <CartSide />
      <div className="container">

      <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="/">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Checkout</li>
  </ol>
</nav>
        <h1>Checkout</h1>
        <h3>List of product in your cart:</h3>
        <div className="row">
          <div className="col-lg-9 p-2">
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Price</th>
                  <th>img</th>
                  <th>---</th>
                </tr>
              </thead>
              <tbody>
                {carts_ar.map((item, i) => {
                  totalCart += item.count * item.price;
                  return (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.count}</td>
                      <td>{(item.count * item.price).toFixed(2)}</td>
                      <td className="w-25"><img src={item.img} className="w-50" /></td>
                      <td >
                        <div className="d-flex">
                          <button onClick={() => {
                            reduceProd(item)
                          }}  className="btn btn-danger">-</button>
                          <button onClick={() => {
                            addProd(item)
                          }} className="btn btn-info">+</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>


          </div>
          <div className="col-lg-3 border p-2 d-flex justify-content-center align-items-center text-center" style={{ height: "300px" }}>
            <div>
              <h3>Total price: {totalCart.toFixed(2)} nis</h3>
              {/* <button onClick={checkoutReal} className="btn btn-outline-info w-100">Commit buy</button> */}
              <PayPalBtn successFunc={checkoutReal} total={totalCart.toFixed(2)} clientId="AbiWx8wSIUBrmPTxcyHs8TTCHi1k6u9vYdGP4VvOsO42snOPp6hQ0WwKDvgr3berBD8LuqrNXhZ9793I"/>

            </div>
          </div>
        </div>

      </div>
    </React.Fragment>
  )
}

export default Checkout