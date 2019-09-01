import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyBJXIpI4rkcSPTOYcql8X7SXeArEnyTLqw",
  authDomain: "todoist-clone-fa0c9.firebaseapp.com",
  databaseURL: "https://todoist-clone-fa0c9.firebaseio.com",
  projectId: "todoist-clone-fa0c9",
  storageBucket: "todoist-clone-fa0c9.appspot.com",
  messagingSenderId: "723418349114",
  appId: "1:723418349114:web:c30d03eb3c4ec0a6"
});

export { firebaseConfig as firebase };
