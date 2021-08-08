import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { doApiMethod, URL_API } from '../../services/apiSer';

function AuthClient(props){
  let history = useHistory()

  useEffect(()=> {


    if(!localStorage["tok"]){
      history.push("/login");
    }
    else{
      doApi();
    }
  },[props.match]);

  const doApi = async() => {
    let url = URL_API+"/users/myInfo";
    let data = await doApiMethod(url,"GET");

    if(!data._id){
      localStorage.removeItem("tok");
      history.push("/login");

    }
  }

  return(
    <React.Fragment>
    </React.Fragment> 
  )
}

export default AuthClient