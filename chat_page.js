const firebaseConfig = {
    apiKey: "AIzaSyBMy0SfGkz9KoJgJXEImrjInkeOgKQjGEQ",
    authDomain: "kwitter-51f56.firebaseapp.com",
    databaseURL: "https://kwitter-51f56-default-rtdb.firebaseio.com",
    projectId: "kwitter-51f56",
    storageBucket: "kwitter-51f56.appspot.com",
    messagingSenderId: "577008372609",
    appId: "1:577008372609:web:ca5ae5ee2d39bf46bcb680",
    measurementId: "G-0MPQG9J0BX"
  };
  

  
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var user_name = localStorage.getItem("user_name");
    var room_name = localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value',
     function(snapshot) { document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) { 
            childKey = childSnapshot.key; 
            childData = childSnapshot.val(); if(childKey != "purpose") { 
            firebase_message_id = childKey; message_data = childData;
            console.log(firebase_message_id); console.log(message_data); 
            name_from_DB= message_data['name']; message= message_data['message']; 
            likes= message_data['likes']; 
            // creating html tags for displaying message name and likes 
            user_with_tag="<h4>"+ name_from_DB+ "<img class='user_tick' src='tick.png'>"; 
            message_with_tag="<h4 class='message_h4'>"+ message+ "</h4>"; 
            like_button="<button class='btn btn-warning' id="+ firebase_message_id+ " value="+ likes+" onclick='updatelike(this.id)'>"; 
            span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>likes: "+ likes +"</span></button>";
            row = user_with_tag + message_with_tag + like_button + span_with_tag;
            document.getElementById("output").innerHTML += row;
            }
        });
    });
}

getData();

function updatelike(message_id){ console.log("clicked on like button"+ message_id); 
button_id=message_id;
likes=document.getElementById(button_id).value;
updated_LIKES= Number(likes)+1;
console.log(updated_LIKES);
firebase.database().ref(room_name).child(message_id).update({ likes: updated_LIKES }); }

function send(){ msg=document.getElementById("msg").value;
firebase.database().ref(room_name).push({ name: user_name, message: msg, likes: 0 });
document.getElementById("msg").value=""; }

function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html"        
}
