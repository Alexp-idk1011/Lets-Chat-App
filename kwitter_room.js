
//ADD YOUR FIREBASE LINKS HERE
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
      var username = localStorage.getItem("user_name")
      document.getElementById("user_name").innerHTML = "Welcome " + username + "!";
      function addRoom() {
            room_name = document.getElementById("room_name").value;
            firebase.database().ref("/").child(room_name).update({
                  purpose: "adding room name"
            });
            localStorage.setItem("room_name", room_name);
            //window.location="chat_page.html"
      }
      function getData() {firebase.database().ref("/").on('value', 
      function(snapshot) {document.getElementById("output").innerHTML = "";
      snapshot.forEach(function(childSnapshot) {
            childKey  = childSnapshot.key;
      Room_names = childKey;
      //Start code
            console.log("room name-" + Room_names);
            row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)'>#" + Room_names + "</div> <hr>";
            document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function redirectToRoomName(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "chat_page.html";
}
function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html"        
}
