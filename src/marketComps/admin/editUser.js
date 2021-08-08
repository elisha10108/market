import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

import { doApiGet, doApiMethod, URL_API } from '../../services/apiSer';
import {  useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

function EditUser(props) {
  let [user_ar, setUserAr] = useState([])
  let [userData, setUserData] = useState({});


  let history = useHistory()
  const { register, handleSubmit, errors } = useForm();



  
  let nameRef = register({ required: true, minLength: 2 })
  let emailRef = register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i });
  let passRef = register({ required: true, minLength: 3 })
  let phoneRef = register({ required: true, minLength: 3 })
  let addressRef = register({ required: false, minLength: 3 })

  useEffect(() => {
    doApiGetUser();
    getInfoOfUserToEdit()
  }, [])
  const doApiGetUser = async () => {
    let url = URL_API + "/users"
    let data = await doApiGet(url);
    setUserAr(data);
  }

  const getInfoOfUserToEdit = async () => {
    let editId = props.match.params.id;
    let url = URL_API + "/users/singleUser/" + editId;
    let data = await doApiGet(url)
    console.log(data);
    setUserData(data);
  }



  const onFormSub = (dataBody) => {
    console.log(dataBody);

    doApi(dataBody)
  }

  const doApi = async (dataBody) => {
    let editId = props.match.params.id;
    let url = URL_API + "/users/" + editId;
    let data = await doApiMethod(url, "PUT", dataBody);

    if (data.n === 1) {
      toast.success("user updated");
      history.push("/admin/users");
    }
    else {
      toast.error("There is problem try again later");
    }
  }

  
  

  // 15:02

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onFormSub)} className="col-lg-6 mx-auto p-2 shadow mt-3">
      <h1>Edit user</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input defaultValue={userData.email} ref={emailRef} name="email" type="text" className="form-control" id="email" />
          {/* האירור לפי השם של האינפוט מייצר לעצמו מאפיין אם יש שם טעות */}
          {errors.email && <span className="text-danger">Please enter valid Email</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">Password</label>
          <input defaultValue={userData.pass} ref={passRef} name="pass" type="text" className="form-control" id="pass" />
          {errors.pass && <span className="text-danger">Please enter valid Password min 3 charts</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full name</label>
          <input defaultValue={userData.name} ref={nameRef} name="name" type="text" className="form-control" id="name" />
          {errors.name && <span className="text-danger">Please enter valid name min 2 charts</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input defaultValue={userData.phone} ref={phoneRef} name="phone" type="text" className="form-control" id="phone" />
          {errors.phone && <span className="text-danger">Please enter valid phone min 9 charts</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input defaultValue={userData.address} ref={addressRef} name="address" type="text" className="form-control" id="address" />
          {errors.address && <span className="text-danger">Please enter valid address min 9 charts</span>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>


      </form>

    </div>
  )
}

export default EditUser