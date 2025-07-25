    // console.log("hello")
    import { app, auth, signInWithEmailAndPassword } from "./fireBase.js";
    // console.log(getFirestore)
    console.log(app)

    const isCheck = () => {
        console.log("isCheck")
        const userUid = localStorage.getItem("uid")
        if(userUid){
            window.location.replace("./dashbord.html")
        }
    }

    window.isCheck = isCheck

    const loginHandler = async () =>{
        console.log("hello")
        try {
            const email = document.getElementById("email")
            const password = document.getElementById("password")

            if(!email.value || !password.value){
                alert("Please enter email and password")
                return;
            }

            const response = await signInWithEmailAndPassword(auth, email.value, password.value)
            console.log(response,"response")

            alert("completed")

            localStorage.setItem("uid", response.user.uid)
            window.location.replace("./dashbord.html")

        } catch (error) {
            console.log("error", error.message)
        }

    }

    window.loginHandler = loginHandler