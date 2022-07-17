import {} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, getDocs,doc,addDoc,where,query,setDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { firebaseConfig } from './config.js';

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  getQuestions()
document.getElementById("schooltext").innerHTML=`${localStorage.getItem("s")} School ${localStorage.getItem("g")} grade`
const qs=document.getElementById("questions");
async function getQuestions(){
    let d=query(collection(db,"Questions"),where("school","==",localStorage.getItem("s"),where("grade","==",localStorage.getItem('g')))); const snap= await getDocs(d); snap.forEach((doc)=>{
        console.log(doc.data())
        let newdiv=document.createElement("div");
        newdiv.id="na"
        let title=document.createElement("h2")
        let user=document.createElement("h3");
        title.innerHTML=doc.data().title;
        console.log(Date.now())
        console.log(doc.data().name)
        let tim=new Date(doc.data().time)
        let exp=document.createElement("button")
        exp.innerHTML="see full question";
       
        exp.setAttribute("onclick",`window.location.href='q.html?question=${doc.data().title}'`);
        exp.id='exp'
        user.innerHTML=`Posted by ${doc.data().user} on ${tim.toDateString()} at ${tim.getHours()}:${tim.getMinutes()}`
        console.log(user.innerHTML)
        newdiv.appendChild(title)
        newdiv.style.border="solid 2px"
        newdiv.appendChild(user)
        newdiv.appendChild(exp)
        qs.appendChild(newdiv)
      })
  }