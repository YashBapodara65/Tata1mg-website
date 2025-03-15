document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    let user = document.querySelector("#rusername").value;
    let mobno = document.querySelector("#rmobno").value;
    let email = document.querySelector("#remail").value;
    let password = document.querySelector("#rpassword").value;
    let address = document.querySelector("#raddress").value;
    let isValid = true;

    const lowerCase = new RegExp("(?=.*[a-z])");
    const upperCase = new RegExp("(?=.*[A-Z])");
    const number = new RegExp("(?=.*[0-9])");
    const specialChar = new RegExp("(?=.*[!@#\$%\^&\*])");
    const eightChar = new RegExp("(?=.{8,})");

    let obj = {
        Username: user,
        MobileNo: mobno,
        EmailID: email,
        Password: password,
        Address: address
    }

    if (user == "") {
        document.querySelector("#user-err").innerHTML = "Username is required *";
        document.querySelector("#user-err").style.color = "red";
        isValid = false;
    }
    else {
        document.querySelector("#user-err").innerHTML = "";
    }

    if (mobno == "") {
        document.querySelector("#mobno-err").innerHTML = "Mobile number is required *";
        document.querySelector("#mobno-err").style.color = "red";
        isValid = false;
    }
    else if (isNaN(mobno)) {
        document.querySelector("#mobno-err").innerHTML = "Only numbers allowed *";
        document.querySelector("#mobno-err").style.color = "red";
        isValid = false;
    }
    else if (mobno.length != 10) {
        document.querySelector("#mobno-err").innerHTML = "Plese enter ten digits *";
        document.querySelector("#mobno-err").style.color = "red";
        isValid = false;
    }
    else {
        document.querySelector("#mobno-err").innerHTML = "";
    }

    if (email == "") {
        document.querySelector("#email-err").innerHTML = "Email ID is required *";
        document.querySelector("#email-err").style.color = "red";
        isValid = false;
    }
    else {
        document.querySelector("#email-err").innerHTML = "";
    }

    if (password == "") {
        document.querySelector("#password-err").innerHTML = "Password is required *";
        document.querySelector("#password-err").style.color = "red";
        isValid = false;
    }
    else if (eightChar.test(password) && number.test(password) && specialChar.test(password) && (lowerCase.test(password) || upperCase.test(password))) {
        document.querySelector("#password-err").innerText = "";
    }
    else {
        document.querySelector("#password-err").innerHTML = "Password should have a minimum 8 characters at least 1 alphabet, 1 numeric, 1 special character *";
        document.querySelector("#password-err").style.color = "red";
        isValid = false;
    }

    if (address == "") {
        document.querySelector("#address-err").innerHTML = "Address is required *";
        document.querySelector("#address-err").style.color = "red";
        isValid = false;
    }
    else {
        document.querySelector("#address-err").innerHTML = "";
    }

    if (isValid) {
        fetch(`http://localhost:3000/visitors?EmailID=${email}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.length > 0) {
                    Swal.fire({
                        icon: "error",
                        title: "Register",
                        text: "Please register with different email'id",
                    });
                }
                else {
                    add(obj);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }


    function add(data) {
        fetch(`http://localhost:3000/visitors`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                document.querySelector("#rusername").value = "";
                document.querySelector("#rmobno").value = "";
                document.querySelector("#remail").value = "";
                document.querySelector("#rpassword").value = "";
                document.querySelector("#raddress").value = "";
                Swal.fire({
                    title: "Login",
                    text: "Please login with your email and password...!",
                    icon: "info"
                }).then((res)=>{
                    if(res.isConfirmed)
                    {
                        window.location.href = "login.html";
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }

});