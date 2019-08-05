export const state=()=>{
    return {
        history:[]
    }
}
// 同步修改数据mutations
export const mutations ={
    sethistory(state,arr){
        state.history=arr
        console.log( state.history)
    }
}
// actions
export const actions ={

    
}