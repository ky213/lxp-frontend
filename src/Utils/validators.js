export const required = (value) =>{
    if(value) return undefined;
    
    return 'The field is required!';
}

export const foo = console.log;

export const isEmail = (value) => {
    let rep = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(rep.test(value)){
        return undefined;
    }
    return 'Incorrect email!';   
}
export const passValidationMatch = (value, allValues) => {
    if(value !== allValues.newPassword) return `Passwords didn't match!`;
    return undefined;
}

export const emailValidationMatch = (value, allValues) => {
    if(value !== allValues.newEmail) return `Emails didn't match!`;
    return undefined;
}