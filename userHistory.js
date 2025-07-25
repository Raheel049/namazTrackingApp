import { getDoc, doc, db, getDocs, collection } from "./fireBase.js"

const userHistory = async () => {
console.log("hello")

   try {
    const userUid = localStorage.getItem("uid")

    const namzaDatesRef = collection(db, "namazHistory", userUid, "namazDates")
    const snapShot = await getDocs(namzaDatesRef)
    console.log("snapShot",snapShot)

    const parent = document.getElementById("parent")
    parent.innerHTML = ""
    console.log(parent)

    snapShot.forEach((doc) => {
        console.log("doc",doc.data())
        const userData = doc.data()

        parent.innerHTML += `<h3>${userData.date}</h3>
        <div class="namazField">
            <p>Fajar</p>
            <p>${userData.fajar}</p>
        
        </div>

        <div class="namazField">
            <p>Zohar</p>
            <p>${userData.zohar}</p>
        
        </div>

        <div class="namazField">
            <p>Asar</p>
            <p>${userData.asar}</p>
        
        </div>

        <div class="namazField">
            <p>Magrib</p>
            <p>${userData.magrib}</p>
        
        </div>

        <div class="namazField">
            <p>isha</p>
            <p>${userData.isha}</p>
            
            
        </div>   `
        
    })
   } catch (error) {
        console.log("error", error)
   }

}

window.userHistory = userHistory

