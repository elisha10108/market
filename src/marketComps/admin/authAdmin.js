import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { doApiMethod, URL_API } from '../../services/apiSer';

function AuthAdmin(props){
  let history = useHistory()

  useEffect(()=> {

    //TODO: check if already in /admin
    if(!localStorage["tok"]){
      history.push("/admin");
    }
    else{
      doApi();
    }
  },[props.match])

  const doApi = async() => {
    let url = URL_API+"/users/checkAdmin";
    let data = await doApiMethod(url,"POST",{});

    if(data.auth !== "success"){
      localStorage.removeItem("tok");
      history.push("/admin");

    }
  }

  return(
    <React.Fragment>
    </React.Fragment> 
  )
}

export default AuthAdmin