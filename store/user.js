// 保存数据的属性state
export const state=()=>{
    return {
       userInfo:{
          token:'',
          user:{}
       }
    }
}
// 同步修改数据mutations
export const mutations = {
   setUserInfo(state,data){
      state.userInfo=data
   },
   clearUserInfo(state){
      state.userInfo={
         token:'',
          user:{}
      }
   }
     
}
// actions
export const actions ={

    
}