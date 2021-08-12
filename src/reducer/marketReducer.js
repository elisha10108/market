const stateInit = {
  carts_ar: [],
  name: "moshe",
  showCart:false,
  flagP:false,
  categories_ar: []
}


export const marketReducer = async (state= stateInit , action) => {

    if(action.type=== "SHOW_HIDE_CART" ) 
        return saveToLocal({...state, showCart:action?.flag})
    
    
    else  if(action.type=== "UPDATE_THE_CART")  {
        if(state){
           let prodFound = false;
           
           let temp_ar =  [state , state?.carts_ar]
      
           if(temp_ar.length>0){
           temp_ar?.map((item , i) => {
             if(item?._id === action.item?._id){
               if(item.qty >= action.item.count){
                  item.count = action.item.count;
                 }
                    prodFound = true;
                     if(action.item.count <= 0){
                        temp_ar.splice(i,1);
                     }
               }
          
        })
      }
    }
      return saveToLocal({...state , action});
    }
  
    else  if(action.type=== "UPDATE_FLAG") {
        return ({...state,plagP: action.flagprod});
     }


    else{
      return (localStorage["market"]) ? JSON.parse(localStorage["market"]) : state;
    }
  }


// const updateCart = async(state,action) => {

//   if(state){
//   let prodFound = false;
//   let temp_ar = await [...state , state.carts_ar]

//   if(temp_ar.length>0){
//   temp_ar.map((item , i) => {
//     if(item._id === action.item._id){
//       if(item.qty >= action.item.count){
//         item.count = action.item.count;
//       }
//       prodFound = true;
//       // אם הקאונט שווה 0 נמחוק את הפריט מהמערך של העגלה
//       if(action.item.count <= 0){
//         temp_ar.splice(i,1);
//       }
//     }
    
//   })
// }


//   if(!prodFound) {
//     temp_ar.push(action.item)
//   }
//   return {...state, carts_ar:temp_ar}
//  }

// }



const saveToLocal = (stateTOSave) => {
  localStorage.setItem("market", JSON.stringify(stateTOSave));
  return stateTOSave;
}