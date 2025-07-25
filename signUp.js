import { collection, createUserWithEmailAndPassword, addDoc, db, auth, setDoc, doc } from "./fireBase.js"


const isCheck = () => {
    console.log("isCheck")
    const userUid = localStorage.getItem("uid")
    if(userUid){
        window.location.replace("./dashbord.html")
    }
}

window.isCheck = isCheck

const signUpHandler = async () =>{
    try {
        console.log("hello")
    const firstName = document.querySelector("#firstName")
    const lastName = document.querySelector("#lastName")
    const email = document.querySelector("#email")
    const password = document.querySelector("#password")
    const phoneNo = document.querySelector("#phoneNo")

    const response = await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log("response", response)

    const uid = response.user.uid
    // console.log("uid",uid)
    
    const userObj = {
        firstName : firstName.value,
        lastName : lastName.value,
        email : email.value,
        password : password.value,
        phoneNo : phoneNo.value,
        userid : response.user.uid,
    }

    const userData = await setDoc(doc(db, "usersTwo", uid),userObj)
    console.log("userData", userData)
    window.location.replace("./index.html")
    } catch (error) {
        console.log("error", error.message)
    }
}


window.signUpHandler = signUpHandler