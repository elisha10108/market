import { useEffect, useState } from "react"



export const useApiHook = (url) => {
  let [items,setItems] = useState([]);

  useEffect(() => {
    doApi();
  },[])

  const doApi = async () => {
    let resp = await fetch(url);
    let data = await resp.json();
    setItems(data);
  }

  return [items];
}