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
            return saveToLocal({...state, showCart:action.flag});
          }
          else  return  state.showCart = false
    
        }
    
    
        else  if(action.type === "UPDATE_THE_CART")  {
        return saveToLocal(updateCart({...state ,  action}));
    
        }
    
        else  if(action.type=== "UPDATE_FLAG") {
            return ({...state,plagP: action.flagprod});
         }
    
    
        else{
          return (localStorage["market"]) ? JSON.parse(localStorage["market"]) : state;
        }
      }
    
    
    
const updateCart = (state,action) => {

    let prodFound = false;
    let temp_ar=[];
    if(state.carts_ar===''){
     temp_ar = [...state.carts_ar]
    temp_ar.map((item , i) => {
        if(item._id === action.item._id){
            // בדוק במלאי כדי לעדכן
            if(item.qty >= action.item.count){
                item.count = action.item.count;
        item.count = action.item.count;   
                item.count = action.item.count;
            }
            prodFound = true;
      prodFound = true; 
            prodFound = true;
            // אם הקאונט שווה 0 נמחוק את הפריט מהמערך של העגלה
            if(action.item.count <= 0){
                temp_ar.splice(i,1);
            }
        }
        if(!prodFound) {
            temp_ar.push(action.item)
    temp_ar.push(action.item) 
            temp_ar.push(action.item)
        }
    })


}
else{
    console.log(stateInit.carts_ar)
    stateInit.carts_ar.push(state.action.item,)
}
    return {...state, carts_ar:temp_ar}
}
const saveToLocal = (stateTOSave) => {
    console.log(stateTOSave);
    localStorage.setItem("market", JSON.stringify(stateTOSave));
    return stateTOSave;
}