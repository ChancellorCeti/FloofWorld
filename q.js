import {} from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js'

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js';
import { getFirestore, collection, getDocs,doc,addDoc,where,query,setDoc,updateDoc } from 'https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js';
import { firebaseConfig } from './config.js';

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const encoded = encodeURI(window.location.href);
  console.log(encoded)
  const uc=window.location.href.split("=").pop().replace(/%20/g, ' ');
  handleLogIn()
  async function handleLogIn(ne,pe){
    let d=query(collection(db,"Questions"),where("title","==",uc)); 
    const snap= await getDocs(d); console.log(snap);
    snap.forEach((doce)=>{
        
        let title=document.createElement("h1");
        let tim=new Date(doce.data().time)
        title.innerHTML=doce.data().title;
        document.body.appendChild(title);
        let usertag=document.createElement("h2");
        usertag.innerHTML=`Posted by ${doce.data().user} on ${tim.toDateString()} at ${tim.getHours()}:${tim.getMinutes()}`
        document.body.appendChild(usertag)
        let bod=document.createElement("p")
        bod.innerHTML=doce.data().body
        document.body.appendChild(bod)
        let replies=document.createElement("div")
        replies.id='replies'
        let li=doce.data().answers
        let ansf=document.createElement("input")
        ansf.id="ansf"
        ansf.placeholder="Answer this question!"
        document.body.appendChild(ansf)
        let s=document.createElement("button")
        s.innerHTML="Submit Response"
        s.addEventListener("click",(e)=>{
            
            up();

            
        })
        document.body.appendChild(s)
        document.body.appendChild(replies)
        for (const item in li) {
            let ansd=document.createElement("div")
            ansd.classList.add("ansd")
            let replyt=document.createElement("h3")
            replyt.innerHTML=`Posted by ${li[item]['user']}`
            ansd.appendChild(replyt)
            let bo=document.createElement("p")
            bo.id="bo"
            bo.innerHTML=li[item]['body']
            ansd.appendChild(bo)
            document.getElementById("replies").appendChild(ansd)
            
        }
      })
  }
  async function up(){
    await updateDoc(doc(db,"Questions",uc),{
        [`answers.${document.getElementById("ansf").value.slice(0,10)}.user`]:localStorage.getItem("n"),
        [`answers.${document.getElementById("ansf").value.slice(0,10)}.body`]:document.getElementById("ansf").value,
    })
    window.location.href=window.location.href
  }