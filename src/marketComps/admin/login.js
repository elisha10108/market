import React from 'react';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router';
import { doApiMethod, URL_API } from '../../services/apiSer';
import { toast } from 'react-toastify';

function Login() {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory()
  // פונקציה בשיבל לקרוא לתצוגת ההודעות של הטוסט
  // let { addToast } = useToasts();

  let emailRef = register({ required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i });
  let passRef = register({ required: true, minLength: 3 })

  const onFormSub = (dataBody) => {
    //dataBody -> מכיל אובייקט עם המאפיינים לפי השמות של האינפוטים והסלקטים
    console.log(dataBody);
    doApi(dataBody)
  }
  // 13:15
  const doApi = async (dataBody) => {
    let url = URL_API + "/users/login";
    // dataBody > אובייקט שמכיל את האימייל והסיסמא מהטופס
    let data = await doApiMethod(url, "POST", dataBody);
    console.log(data);
    // login success
    if (data.token) {
      // פונקציה שקוראת להודעת טוסט , צבע ירוק ושיעלם
      // addToast("Welcome to admin panel, you logged in",
      //   {
      //     appearance: 'success',
      //     autoDismiss: true
      //   })
      localStorage.setItem("tok", data.token);
      history.push("/admin/list");
    }
    else {
      toast.error("try again , user or password worng")
    }
  }

  return (
    <main>
      {/* handlesubmit - לא יפעיל את הפונקציה שקיבל כפרמטר
      רק אחרי שאין אפילו טעות אחת */}
      <form onSubmit={handleSubmit(onFormSub)} className="col-lg-6 mx-auto p-2 shadow mt-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input ref={emailRef} name="email" type="text" className="form-control" id="email" />
          {/* האירור לפי השם של האינפוט מייצר לעצמו מאפיין אם יש שם טעות */}
          {errors.email && <span className="text-danger">Please enter valid Email</span>}
        </div>
        <div className="mb-3">
          <label htmlFor="pass" className="form-label">Password</label>
          <input ref={passRef} name="pass" type="text" className="form-control" id="pass" />
          {errors.pass && <span className="text-danger">Please enter valid Password min 3 charts</span>}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>


      </form>
    </main>
  )
}

export default Login