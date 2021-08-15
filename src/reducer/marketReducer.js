const stateInit = {
  carts_ar: [],
  name: "moshe",
  showCart:false,
  flagP:false,
  categories_ar: []
}


export const marketReducer = async (state= stateInit , action) => {

    if(action.type=== "SHOW_HIDE_CART" ) {
      if(state.showCart === false){
       console.log( "state.showCart");
        return saveToLocal({...state, showCart:action.flag});
      }
      else state.showCart = false
      
      console.log(state.showCart);
    }


    else  if(action.type === "UPDATE_THE_CART")  {
    return saveToLocal(updateCart({...state , action}));
    }
  
    else  if(action.type=== "UPDATE_FLAG") {
        return ({...state,plagP: action.flagprod});
     }


    else{
      return (localStorage["market"]) ? JSON.parse(localStorage["market"]) : state;
    }
  }


const updateCart = async(state,action) => {

  if(state){
  let prodFound = false;
  console.log(state.action );
  let temp_ar =  [...state.action.item , state.carts_ar]

  if(temp_ar.length>0){
  temp_ar.map((item , i) => {
    if(item._id === action.item._id){
      if(item.qty >= action.item.count){
        item.count = action.item.count;
      }
      prodFound = true;
      // אם הקאונט שווה 0 נמחוק את הפריט מהמערך של העגלה
      if(action.item.count <= 0){
        temp_ar.splice(i,1);
      }
    }
    
  })
}


  if(!prodFound) {
    temp_ar.push(action.item)
  }
  return {...state, carts_ar:temp_ar}
 }

}



const saveToLocal = (stateTOSave) => {
  localStorage.setItem("market", JSON.stringify(stateTOSave));
  
  return stateTOSave;
}