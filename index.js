import {} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js'
import {firebaseConfig} from './config.js'
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, getDocs,doc,addDoc,where,query,setDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const l=document.getElementById("l")
  const su=document.getElementById("su")
  const submit=document.getElementById("submit")
        console.log(submit)
  const password=document.getElementById("pwd")
  const name=document.getElementById("name")
  const school=document.getElementById("school")
  const grade=document.getElementById("grade")
  submit.addEventListener("click",(e)=>{
    handleSignUp(name.value,password.value,grade.value,school.value)
  })
    
  su.addEventListener("click",(e)=>{
    document.getElementById("fl").innerHTML=' <input id="name" type="text"><input id="pwd" type="password"><input id="school" type="text"><input id="grade" type="text"><button id="submit">Submit</button>'
    setTimeout(()=>{
        const submit=document.getElementById("submit")
        console.log(submit)
  const password=document.getElementById("pwd")
  const name=document.getElementById("name")
  const school=document.getElementById("school")
  const grade=document.getElementById("grade")
  submit.addEventListener("click",(e)=>{
    handleSignUp(name.value,password.value,grade.value,school.value)
  })
    },2000)
  
})
l.addEventListener("click",(e)=>{
    document.getElementById("fl").innerHTML='  <h1 id="st"></h1> <input id="name" type="text" placeholder="name"><input id="pwd" type="password" placeholder="password"><button id="subm">Log in</button>'
    const submit=document.getElementById("subm")
  const password=document.getElementById("pwd")
  const name=document.getElementById("name")
  submit.addEventListener("click",(e)=>{handleLogIn(name.value,password.value)})
})
  async function handleSignUp(n,p,g,s){
    
    localStorage.setItem("n",n)
 
    localStorage.setItem("p",p)
    localStorage.setItem("g",g*1)
    localStorage.setItem("s",s)
    console.log(localStorage.getItem("p"))
   console.log(grade.value*1)
    await setDoc(doc(db, "Users",localStorage.getItem("n")), {
        name:localStorage.getItem("n"),
        password:localStorage.getItem("p"),
        grade:grade.value*1,
        school:localStorage.getItem("s")
      });
      document.getElementById("select").innerHTML=""
      document.getElementById("asz").innerHTML="<h3>Please wait, we are creating your user.</h3>"
      setTimeout(()=>{window.location.href="e.html"},1000)
  }
  async function handleLogIn(ne,pe){
    let d=query(collection(db,"Users"),where("name","==",ne)); const snap= await getDocs(d); snap.forEach((doc)=>{
        if(doc.data().password==pe){
            document.getElementById("fl").innerHTML="Welcome to the FloofWorld!";
            localStorage.setItem("g",doc.data().grade*1)
            localStorage.setItem("s",doc.data().school)
            localStorage.setItem("n",doc.data().name)
        }
        document.getElementById("asz").innerHTML="<h3>Please wait, we are creating your user.</h3>"
      setTimeout(()=>{window.location.href="e.html"},1000)
      })
  }
