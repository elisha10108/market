import React from 'react';
import Header from './header';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { doApiMethod, URL_API } from '../../services/apiSer';
import { Link } from 'react-router-dom';

function LoginClient(props) {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory()


  let emailRef = register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i });
  let passRef = register({ required: true, minLength: 3 })

  const onFormSub = (dataBody) => {

    doApi(dataBody)
  }

  const doApi = async (dataBody) => {
    let url = URL_API + "/users/login";
    let data = await doApiMethod(url, "POST", dataBody);

    if (data.token) {
      localStorage.setItem("tok", data.token);

      let url2 = URL_API + "/users/myInfo"
      let userInfo = await doApiMethod(url2, "GET");
console.log(userInfo);
      // פונקציה שקוראת להודעת טוסט , צבע ירוק ושיעלם
      toast.success("You logged in!");
      localStorage.setItem("userName", userInfo.name);
      history.push("/");
    }
    else {
      // addToast("Try again , user or password worng",
      //   {
      //     appearance: 'error',
      //     autoDismiss: true
      //   }
      // )
      // TODO : show toaste message 
      toast.error("try again , user or password worng");
      
    }
  }
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <h1>Log in:</h1>
        <form onSubmit={handleSubmit(onFormSub)} className="col-lg-6 mx-auto p-2 shadow mt-3">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input ref={emailRef} name="email" type="text" className="form-control" id="email" />

            {errors.email && <span className="text-danger">Please enter valid Email</span>}
          </div>
          <div className="mb-3">
            <label htmlFor="pass" className="form-label">Password</label>
            <input ref={passRef} name="pass" type="text" className="form-control" id="pass" />
            {errors.pass && <span className="text-danger">Please enter valid Password min 3 charts</span>}
          </div>
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary">Log in</button>
            <Link to="/signup" className="btn btn-danger">Sign up</Link>
          </div>

        </form>
      </div>
    </React.Fragment>
  )
}

export default LoginClient