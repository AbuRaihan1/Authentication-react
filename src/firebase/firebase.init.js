import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAA46XL1FK1fGGAGNHkbCiBI3sisWjpxIc",
  authDomain: "authentication-react2.firebaseapp.com",
  projectId: "authentication-react2",
  storageBucket: "authentication-react2.appspot.com",
  messagingSenderId: "126754898510",
  appId: "1:126754898510:web:6bb79d4051de7607cd391f",
};

const app = initializeApp(firebaseConfig);
export default app;
