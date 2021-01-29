

 //add cart action
export const addTodo= (id)=>{
    return{
        type: ADD_TODO,
        id
    }
}
//remove item action
export const editTodo=(id)=>{
    return{
        type: EDIT_TODO,
        id
    }
}
//subtract qt action
export const deleteTodo=(id)=>{
    return{
        type: DELETE_TODO,
        id
    }
}
//add qt action
export const changeDealine=(id)=>{
    return{
        type: CHANGE_DEADLINE,
        id
    }
}
