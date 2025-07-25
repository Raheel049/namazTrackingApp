import { doc, getDoc, db, addDoc, setDoc, updateDoc } from "./fireBase.js";

console.log("hello");

const isUserLogin = () => {
  console.log("isUserLogin");

  const userUid = localStorage.getItem("uid");
  if (!userUid) {
    window.location.replace("./index.html");
  }
};

window.isUserLogin = isUserLogin;

const userNamaz = async () => {
  // console.log("hello")
  const dateobj = new Date();
  // console.log(Date.toLocaleDateString()).innerText

  const date = (document.getElementById("date").innerText +=
    ": " + dateobj.toLocaleDateString("en-CA"));

  const userUid = localStorage.getItem("uid");

  const userData = await getDoc(doc(db, "usersTwo", userUid));
  console.log("userData", userData.data());
  const user = userData.data();

  const userEmail = (document.getElementById("userEmail").innerText +=
    " " + user.email);

  const parent = document.querySelector(".parent");
  parent.innerHTML = `        <div class="namazField">
            <p>Fajar</p>
                <input type="checkbox" id="fajChecked">
            </div>

        <div class="namazField">
            <p>Zohar</p>
                <input type="checkbox" id="zohChecked">
            </div>

        <div class="namazField">
            <p>Asar</p>
                <input type="checkbox" id="asrChecked">
            </div>

        <div class="namazField">
            <p>Magrib</p>
                <input type="checkbox" id="magChecked">
            </div>

        <div class="namazField">
            <p>Isha</p>
                <input type="checkbox" id="ishChecked">

        </div> 
        <button onclick="addDataToFBFaj()">UpdateStatus</button>`;
};

const addDataToFB = async () => {
  try {
    const date = new Date().toLocaleDateString("en-CA");
    const userUid = localStorage.getItem("uid");

    const userObj = {
      date: date,
      userUid: userUid,
    };

    await setDoc(doc(db, "namazHistory", userUid), userObj);

    await setDoc(
      doc(db, "namazHistory", userUid, "namazDates", date),
      userObj,
      { merge: true }
    );

    // console.log("fajarNamaz",fajarNamaz)
  } catch (error) {
    console.log("error", error.message);
  }
};

const addDataToFBFaj = async () => {
  // console.log("addDataToFBZoh")

  const namazObj = {
    fajar: "fajChecked",
    zohr: "zohChecked",
    asar: "asrChecked",
    magrib: "magChecked",
    isha: "ishChecked",
  };

  for (var key in namazObj) {
    const chek = document.getElementById(namazObj[key]);
    console.log(chek);

    if (chek && chek.checked) {
      try {
        const date = new Date().toLocaleDateString("en-CA");
        const userUid = localStorage.getItem("uid");

        if (namazObj[key] === "fajChecked") {
          await updateDoc(doc(db, "namazHistory", userUid), {
            fajar: "Done",
          });

          const ishaNamaz = await updateDoc(
            doc(db, "namazHistory", userUid, "namazDates", date),
            {
              fajar: "Done",
            }
          );
        } else if (namazObj[key] === "zohChecked") {
          await updateDoc(doc(db, "namazHistory", userUid), {
            zohar: "Done",
          });

          const ishaNamaz = await updateDoc(
            doc(db, "namazHistory", userUid, "namazDates", date),
            {
              zohar: "Done",
            }
          );
        } else if (namazObj[key] === "asrChecked") {
          await updateDoc(doc(db, "namazHistory", userUid), {
            asar: "Done",
          });

          const ishaNamaz = await updateDoc(
            doc(db, "namazHistory", userUid, "namazDates", date),
            {
              asar: "Done",
            }
          );
        } else if (namazObj[key] === "magChecked") {
          await updateDoc(doc(db, "namazHistory", userUid), {
            magrib: "Done",
          });

          const ishaNamaz = await updateDoc(
            doc(db, "namazHistory", userUid, "namazDates", date),
            {
              magrib: "Done",
            }
          );
        } else if (namazObj[key] === "ishChecked") {
          await updateDoc(doc(db, "namazHistory", userUid), {
            isha: "Done",
          });

          const ishaNamaz = await updateDoc(
            doc(db, "namazHistory", userUid, "namazDates", date),
            {
              isha: "Done",
            }
          );
        }

        const userData = await getDoc(doc(db, "namazHistory", userUid));
        console.log("userData", userData.data());
        const userNamaz = userData.data();
        console.log("userNamaz", userNamaz);

        const Obj = {
          ...userNamaz,
        };

        const cardParent = document.querySelector(".cardParent");
        cardParent.innerHTML = "";

        for (let prayer in Obj) {
          if (
            prayer === "fajar" ||
            prayer == "zohar" ||
            prayer == "asar" ||
            prayer == "magrib" ||
            prayer == "isha"
          )
            // console.log(prayer[Obj],"objPra")
            cardParent.innerHTML += `
                          <div class="card">
                            <p>${prayer}</p>
                            <p>${Obj[prayer]}</p>
                          </div>`;
        }

        // console.log("isha", ishaNamaz)
      } catch (error) {
        console.log("error", error.message);
      }
    }
  }
};

window.addDataToFB = addDataToFB;
window.userNamaz = userNamaz;
window.addDataToFBFaj = addDataToFBFaj;
