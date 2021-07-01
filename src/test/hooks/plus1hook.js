// נייצר הוק משל עצמנו

import { useEffect, useState} from "react";

// הוק שמחזיר משתנה ופונקציה שמעלה אותו ב1
export const usePlus1 = (initVal) => {
  const [val, setVal] = useState(initVal);

  // פועל בהתחלה ישר
  useEffect(() => {
    if(localStorage["counter"]){
      setVal(Number(localStorage["counter"]))
    }
  },[])

  const add1 = () => {
    localStorage.setItem("counter",val+1);
    setVal(val + 1)
  }

  const resetVal = () => {
    setVal(0)
    localStorage.setItem("counter",0);
  }

  return [val,add1,resetVal];
}