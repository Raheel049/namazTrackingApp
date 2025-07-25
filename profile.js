import { getDoc, db, doc, updateDoc } from "./fireBase.js"

const isUserLogin = () =>{
    const userUid = localStorage.getItem("uid")
    if(!userUid){
        window.location.replace("./index.html")
    }
}

const userData = async() => {
    console.log("hello")
    const userUid = localStorage.getItem("uid")
    const userProfileData = await getDoc(doc(db, "usersTwo", userUid))
    console.log("userProfileData",userProfileData.data())
    const user = userProfileData.data()

    const firstName = document.querySelector("#firstName")
    const lastName = document.querySelector("#lastName")
    const email = document.querySelector("#email")
    const phoneNumber = document.querySelector("#phoneNumber")
    const profileImg = document.querySelector("#profileImg")

    firstName.value = user.firstName
    lastName.value = user.lastName
    email.value = user.email
    phoneNumber.value = user.phoneNo
    profileImg.src = user.imageUrl



}

const updateProfileData = async() => {
    console.log("hello")

    try {
        const firstName = document.querySelector("#firstName")
    const lastName = document.querySelector("#lastName")
    const email = document.querySelector("#email")
    const phoneNumber = document.querySelector("#phoneNumber")

    const userUid = localStorage.getItem("uid")

    await updateDoc(doc(db, "usersTwo", userUid),{
        firstName : firstName.value,
        lastName : lastName.value,
        phoneNo : phoneNumber.value,
    })
    } catch (error) {
        console.log("error", error)
    }
}

const profilePic = async () =>{
    try {
        const profileImg = document.querySelector("#profilePic")
    // console.log(profilePic.files[0])
    const file = profileImg.files[0]

    if(!file){
        alert("select file")
    }

    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "namazAppImage")

    const response = await fetch(`https://api.cloudinary.com/v1_1/dczwggcc9/upload`, {
        method: "POST",
        body: formData, 
    }).then((response) => response.json())

    console.log(response.secure_url,"url")

   const  useruid = localStorage.getItem("uid")
   await updateDoc(doc(db, "usersTwo", useruid),{
    imageUrl: response.secure_url,
   })
   userData()
    } catch (error) {
     console.log("error",error)
    }
}

const Logout = document.querySelector("#logout")
// logout.addEventListener("click", Logout)

const logout = () => {
    // console.log("logout")
    localStorage.removeItem("uid")
    isUserLogin()
}

window.logout = logout
window.profilePic = profilePic
window.updateProfileData = updateProfileData
window.userData = userData 