import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import {  doApiMethod, URL_API } from '../../services/apiSer';
import { useHistory } from "react-router-dom";

function EditCat(props) {
    let [catData, setCatData] = useState({});


    let history = useHistory()
    const { register, handleSubmit, errors } = useForm();

    let nameRef = register({ required: true, minLength: 3 });
    let infoRef = register({  });
    let idRef = register({ required: true, min: 1 });

    useEffect (() =>{
        getInfoOfCatToEdit()
    }, [])



    const getInfoOfCatToEdit = async () => {
        let editId = props.match.params.id;

        let url = URL_API + "/categories/single/" + editId;
        let data = await doApiMethod(url,"GET" )
        console.log(data)
        setCatData(data);

    }

    const onFormSub = (dataBody) => {
        console.log(dataBody);

        doApi(dataBody);
    }



    const doApi = async(dataBody) => {
        let editId = props.match.params.id;
        let url = URL_API + "/categories/" + editId;
        let data = await doApiMethod(url,"PUT",dataBody);

        if(data.n === 1){
            toast.success("category updated");
            history.push("/admin/category");
        }
        else{
            toast.error("There is problem choose another short id");
        }
    }



    return (
        <div className="container">
            <form onSubmit={handleSubmit(onFormSub)} className="col-lg-6 mx-auto p-2 shadow mt-3">
                <h1>Edit Category</h1>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">name</label>
                    <input defaultValue={catData.name} ref={nameRef} name="name" type="text" className="form-control" id="name" />
                    {errors.name && <span className="text-danger">Enter vaild name (at least 2 charts)</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="info" className="form-label">info</label>
                    <input defaultValue={catData.info} ref={infoRef} name="info" type="text" className="form-control" id="info" />
                    {errors.info && <span className="text-danger">Enter info (at least 2 charts)</span>}
                </div>

                <div className="mb-3">
                    <label htmlFor="s_id" className="form-label">short id (choose something not in use):</label>
                    <input defaultValue={catData.s_id} ref={idRef} name="s_id" type="text" className="form-control" id="s_id" />
                    {errors.s_id && <span className="text-danger">Enter valid short id higer than 0</span>}
                </div>

                <button type="submit" className="btn btn-primary">Edit category</button>


            </form>

        </div>
    )
}

export default EditCat