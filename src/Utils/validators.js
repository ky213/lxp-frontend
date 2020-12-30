export const required = (value) =>{
    if(value) return undefined;
   
    return 'The field is required!';
}

export const isEmail = (value) => {
    let rep = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(rep.test(value)){
        return undefined;
    }
    return 'Incorrect email!';   
}