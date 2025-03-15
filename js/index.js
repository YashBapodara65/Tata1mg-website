document.querySelector("form").addEventListener("submit",(e)=>{

    e.preventDefault();

    let username = document.querySelector("#rusername").value;
    let mobno = document.querySelector("#rmobno").value;
    let email = document.querySelector("#remail").value;
    let password = document.querySelector("#rpassword").value;
    let address = document.querySelector("#raddress").value;

    const lowerCase = new RegExp("(?=.*[a-z])");
    const upperCase = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const specialChar = new RegExp("(?=.*[!@#\$%\^&\*])");
    const eightChar = new RegExp("(?=.{8,})");

    if(username == "")
    {
        document.querySelector("#user-err").innerHTML = "Username is required *";
        document.querySelector("#user-err").style.color = "red";
    }
    else
    {
        document.querySelector("#user-err").innerHTML = "";
    }

    if(mobno == "")
    {
        document.querySelector("#mobno-err").innerHTML = "Mobile number is required *";
        document.querySelector("#mobno-err").style.color = "red";
    }
    else if(isNaN(mobno))
    {
        document.querySelector("#mobno-err").innerHTML = "Only numbers allowed *";
        document.querySelector("#mobno-err").style.color = "red";
    }
    else if(mobno.length != 10)
    {
        document.querySelector("#mobno-err").innerHTML = "Plese enter ten digits *";
        document.querySelector("#mobno-err").style.color = "red";
    }
    else
    {
        document.querySelector("#mobno-err").innerHTML = "";
    }

    if(email == "")
    {
        document.querySelector("#email-err").innerHTML = "Email ID is required *";
        document.querySelector("#email-err").style.color = "red";
    }
    else
    {
        document.querySelector("#email-err").innerHTML = "";
    }

    if(password == "")
    {
        document.querySelector("#password-err").innerHTML = "Password is required *";
        document.querySelector("#password-err").style.color = "red";
    }
    else if(eightChar.test(password) && number.test(password) && specialChar.test(password) && (lowerCase.test(password) || upperCase.test(password)))
    {
        document.querySelector("#password-err").innerText = "";
    }
    else
    {
        document.querySelector("#password-err").innerHTML = "Password should have a minimum 8 characters at least 1 alphabet, 1 numeric, 1 special character *";
        document.querySelector("#password-err").style.color = "red";
    }

});