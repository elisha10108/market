import React from 'react';
import ApiWithHook from './apiWithHook';
import {usePlus1} from "./hooks/plus1hook"

function OwnHookComp(props){
  let [counter,add1Counter,resetVal] = usePlus1(8)


  return(
    <div>
      <ApiWithHook />
      <hr />
      <h2>Counter: {counter}</h2>
      <button onClick={add1Counter}>add 1</button>
      <button onClick={resetVal}>reset</button>
    </div> 
  )
}

export default OwnHookComp