import React, { useEffect } from 'react';

// יבדוק שמגיעים לתחתית של העמוד
function LoadMoreLazy(props){

  const handleScroll = () => {
    const position = window.pageYOffset;
    // const windowHeight = document.documentElement.get;
    console.log(position);
  };


  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    
   
    // מצב COMPENENT WILL UNMOUNT
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  },[])

  const onMouseScroll = (ev) => {
    console.log(ev);
    console.log("aaa")
  } 

  return(
    <div onScroll={onMouseScroll} style={{height:"2000px"}}>LoadMoreLazy work</div> 
  )
}

export default LoadMoreLazy