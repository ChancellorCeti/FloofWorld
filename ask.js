import {} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, getDocs,doc,addDoc,where,query,setDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { firebaseConfig } from './config.js';

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const title=document.getElementById("title")
  const tags=document.getElementById("tags")
  const body=document.getElementById("body")
  const btn=document.getElementById("sub");
  console.log(db)
  btn.addEventListener("click",(e)=>{
    console.log(title.value,tags.value,body.value)
    setDoc(doc(db,"Questions",title.value),{
        title:title.value,
        tags:tags.value,
        body:body.value,
        user:localStorage.getItem("n"),
        school:localStorage.getItem("s"),
        grade:localStorage.getItem("g")*1,
        time:Date.now(),
        answers:[]

    })
  })