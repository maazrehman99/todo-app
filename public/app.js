const firebaseConfig = {
  apiKey: "AIzaSyCPYjcJm7_g7GcNjzYlanz2YuPFdeHWTNs",
  authDomain: "to-do-app-18446.firebaseapp.com",
  projectId: "to-do-app-18446",
  storageBucket: "to-do-app-18446.appspot.com",
  messagingSenderId: "1075425224270",
  appId: "1:1075425224270:web:fa8e7b6476a963434bc51f",
  measurementId: "G-ZDYKK477DY"
};
var frb = firebase.initializeApp(firebaseConfig) 


firebase.database().ref('todos').on('child_added',function(data){
   var olEle=document.getElementById("taskLi")
    var liEle=document.createElement("li")
    var edtBtn=document.createElement("button")
    var dltBtn=document.createElement("button")

    liEle.setAttribute("class","list-group-item border border-dark-subtle bg-success-subtle")

    

    dltBtn.innerHTML="Delete"
    dltBtn.setAttribute("onclick","dltTask(this)")
    dltBtn.setAttribute("class","btn btn-danger float-end m-1")
    dltBtn.setAttribute("id",data.val().key)
   
    edtBtn.innerHTML="Edit"
    edtBtn.setAttribute("onclick","edtTask(this)")
    edtBtn.setAttribute("class","btn btn-success float-end m-1")
    edtBtn.setAttribute("id",data.val().key)

    
    var txtNd= document.createTextNode(data.val().value)
    liEle.appendChild(txtNd)
    liEle.appendChild(edtBtn)
    liEle.appendChild(dltBtn)
  olEle.appendChild(liEle)
})

function addVal(){
  var taskVal=document.getElementById("taskInp").value;
  var dataBase= firebase.database().ref("todos")
  var  key=dataBase.push().key;
  var todo={
    value: taskVal,
    key:key
  }
  dataBase.child(key).set(todo)
  taskVal=""
  console.log(key)
 
  

 
}
function dltTask(dltthis){
  firebase.database().ref('todos').child(dltthis.id).remove()
  dltthis.parentNode.remove()
}

function edtTask(edtthis){
  var val=edtthis.parentNode.firstChild.nodeValue;
  var editValue=prompt("Enter edit Value",val)
  var edtTodos={
         value:editValue,
         key : edtthis.id
  }
  firebase.database().ref('todos').child(edtthis.id).set(edtTodos)
  edtthis.parentNode.firstChild.nodeValue=editValue

}
