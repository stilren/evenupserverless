import * as types from './action-types'

export function setTitle(title){
    return {
        type: types.SET_TITLE,
        title
    }
}

export function resetNavbar(){
    return {
        type: types.RESET_NAVBAR,
    }
}

export function setBackarrow(bool){
    return {
        type: types.SET_BACK_ARROW,
        bool
    }
}

export function setForm(formName){
    return {
        type: types.SAVE_FORM,
        formName
    }
}

