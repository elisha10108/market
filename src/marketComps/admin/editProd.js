import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { doApiGet, doApiMethod, URL_API } from '../../services/apiSer';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';

function EditProd(props) {
  let [cat_ar, setCatAr] = useState([])
  let [prodData, setProdData] = useState({});


  let history = useHistory()
  const { register, handleSubmit, errors } = useForm();



  let fileRef = useRef()
  let nameRef = register({ required: true, minLength: 3 });
  let infoRef = register({ });
  let priceRef = register({ required: true, min: 1 });
  let imageRef = register({});
  let qtyRef = register({ required: true, min: 1 });
  let commentsRef = register({});
  let catRef = register({ required: true });
  let typeRef =register({});


  useEffect(() => {
    doApiGetCat();
    getInfoOfProdToEdit()
  })

 
  const doApiGetCat = async () => {
    let url = URL_API + "/categories"
    let data = await doApiGet(url);
    setCatAr(data);
  }

  const getInfoOfProdToEdit = async () => {
    let editId = props.match.params.id;
    let url = URL_API + "/prods/single/" + editId;
    let data = await doApiGet(url)
    setProdData(data);
  }



  const onFormSub = (dataBody) => {
    console.log(dataBody);

    doApi(dataBody)
  }

  const doApi = async (dataBody) => {
    let editId = props.match.params.id;
    let url = URL_API + "/prods/" + editId;
    let data = await doApiMethod(url, "PUT", dataBody);
    // if succed we will get n = 1
    console.log(data);
    if (data.n === 1) {
      toast.success("prod updated");
      history.push("/admin/list");
    }
    else {
      toast.error("There is problem try again later");
    }
  }

  const uploadFile = async () => {
    // ככה אוספים מידע מקובץ שרוצים לשלוח
    let editId = props.match.params.id;
    console.log(fileRef.current.files[0])
    // שיטה לשליחת מידע כגון קובץ
    const myData = new FormData();
    // fileSend -> הקיי של השם מאפיין בצד שרת של הקובץ
    myData.append("fileSend", fileRef.current.files[0])
    let url = URL_API + "/prods/upload/" + editId;
    try {
      let resp = await axios.put(url, myData, {
        headers: {
          'auth-token': localStorage["tok"],
          'content-type': "multipart/form-data"
        }
      });

      if(resp.data.n === 1){
        getInfoOfProdToEdit()
      }
      console.log(resp.data)
    }
    catch (err) {
      console.log(err);
    }

  }

  // 15:02

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onFormSub)} className="col-lg-6 mx-auto p-2 shadow mt-3">
        <h1>Edit product</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">name</label>
          <input defaultValue={prodData.name} ref={nameRef} name="name" type="text" className="form-control" id="name" />
          {errors.name && <span className="text-danger">Enter vaild name (at least 2 charts)</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="info" className="form-label">info</label>
          <input defaultValue={prodData.info} ref={infoRef} name="info" type="text" className="form-control" id="info" />
          {errors.info && <span className="text-danger">Enter info (at least 2 charts)</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Price:</label>
          <input defaultValue={prodData.price} ref={priceRef} name="price" type="text" className="form-control" id="price" />
          {errors.price && <span className="text-danger">Enter valid price higer than 0</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image:</label>
          <input defaultValue={prodData.img} ref={imageRef} name="img" type="text" className="form-control" id="image" />
          {errors.img && <span className="text-danger">Enter valid image higer than 0</span>}
          <label> ,upload imagfrom computer</label>

          {/* {(prodData.img.includes("http")) ? 
          <img alt={"img"} src={prodData.img} height="100" />

            : <img alt={"img"} src={URL_API+prodData.img+"?"+Date.now()} height="100" />
            } */}
          <br/>
          <input ref={fileRef} type="file" onChange={uploadFile} className="me-3" />
        </div>
        <div className="mb-3">
          <label htmlFor="qty" className="form-label">QTY:</label>
          <input defaultValue={prodData.qty} ref={qtyRef} name="qty" type="number" className="form-control" id="qty" />
          {errors.qty && <span className="text-danger">Enter valid qty higer than 0</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="comments" className="form-label">Comments:</label>
          <input defaultValue={prodData.comments} ref={commentsRef} name="comments" type="text" className="form-control" id="comments" />
          {errors.comments && <span className="text-danger">Enter valid comments</span>}
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select  ref={catRef} name="category_s_id" id="category" className="form-select" >
            {cat_ar.map(item => {
              return (
                <option
                  selected={(prodData.category_s_id === item.s_id)}
                  key={item.s_id} value={item.s_id}>
                  {item.name}
                </option>
              )
            })}
          </select>
          {errors.category_s_id && <span className="text-danger">There is problem, please wait... or click refresh</span>}
        </div>


        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select   ref={typeRef} name="type" id="type" className="form-select" >
          <option  value={"1"} >משקל    </option>
            <option  value={"2"} >יחידה   </option>
            <option  value={"3"} >גם וגם  </option>
          </select>
          {errors.type && <span className="text-danger">There is problem, please wait... or click refresh</span>}
        </div>
        <button type="submit" className="btn btn-primary">update product</button>


      </form>

    </div>
  )
}

export default EditProd