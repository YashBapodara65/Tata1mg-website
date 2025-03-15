document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();

    let lemail = document.querySelector("#lemail").value;
    let lpassword = document.querySelector("#lpassword").value;
    let valid = true;

    if (lemail == "") {
        document.querySelector("#lemail-err").innerHTML = "Email ID is required *";
        document.querySelector("#lemail-err").style.color = "red";
        valid = false;
    }
    else {
        document.querySelector("#lemail-err").innerHTML = "";
    }

    if (lpassword == "") {
        document.querySelector("#lpassword-err").innerHTML = "Password is required *";
        document.querySelector("#lpassword-err").style.color = "red";
        valid = false;
    }
    else {
        document.querySelector("#lpassword-err").innerHTML = "";
    }

    if (valid) {
        fetch(`http://localhost:3000/visitors?EmailID=${lemail}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.length > 0) {
                    console.log(res);
                    if (res[0].Password == lpassword) {
                        localStorage.setItem("email2", JSON.stringify(lemail));
                        Swal.fire({
                            title: "Login Successfull!",
                            icon: "success"
                        }).then((res) => {
                            if (res.isConfirmed) {
                                window.location.href = "index.html";
                            }
                        });
                    }
                    else {
                        document.querySelector("#lpassword-err").innerHTML = "Wrong password *";
                        document.querySelector("#lpassword-err").style.color = "red";
                    }
                }
                else {
                    document.querySelector("#lemail-err").innerHTML = "Please enter the valid email'ID *";
                    document.querySelector("#lemail-err").style.color = "red";
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

});