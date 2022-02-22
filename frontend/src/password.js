passwordStrength("JunkPass5*");
function passwordStrength(password){
    //checks for appropriate password length
    let length = false;
    if(password.length >= 8 && password.length <= 15){
        length = true;
    }
    //checks for special characters
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    let special = specialChars.test(password);
    //checks for numbers, uppercase letters, and lowercase letters
    let upper = false;
    let lower = false;
    let number = false;
    for(let i = 0; i < password.length; i++){
        if(password.charAt(i) == password.charAt(i).toUpperCase()){
            upper = true;
        }
        if(password.charAt(i) == password.charAt(i).toLowerCase()){
            lower = true;
        }
        if(parseInt(password.charAt(i))){
            number = true;
        }
    }
    //checks if it contains all of the elements
    if(length && upper && lower && number && special){
        console.log("Good password");
        return true;
    }
    else{
        return false;
    }
}