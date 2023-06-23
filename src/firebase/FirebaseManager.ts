import * as client from "./client";
import { signInWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';


export class FirebaseManager {
    static instance: FirebaseManager;

    constructor() {
        if (FirebaseManager.instance) {
        return FirebaseManager.instance;
        }
        FirebaseManager.instance = this;

        // console.log(client.app);
        // console.log(client.auth);
        // console.log(client.auth);
        console.log("CONNECTED to Firebase");
        // console.log(client.auth.currentUser);
        //this.SendSignInLinkToEmail("korbinian.maag@gmail.com");
        //this.AuthWithEmailLink();
    }

    //Create new email acount
    async EmailSignUp(email, password, username) {
      return new Promise((resolve) => {
        createUserWithEmailAndPassword(client.auth, email, password)
            .then((userCredential) => {
              // User sign-up successful, do something with userCredential.user
              const user = userCredential.user;
              client.SetUser(user);
              console.log('User sign-up successful:', user);
  
              this.UpdateUsername(username);

              // updateProfile(client.GetUser(), { displayName: username })
              // .then(() => {
              //   console.log("SET username to " + username)
              // })
              // .catch((error) => {
              //   console.log("CAN'T update Username");
              // });
              
              resolve(true);
            })
            .catch((error) => {
              // Handle sign-up error
              // console.log('Sign-up error:', error);
              resolve(false);
            }
          )
      });
    }

    async UpdateUsername(username) {
      return new Promise((resolve) => {
        updateProfile(client.GetUser(), { displayName: username })
        .then(() => {
          // console.log("SET username to " + username)
          resolve(true);
        })
        .catch((error) => {
          // console.log("CAN'T update Username");
          resolve(false);
        });
      })
    }

    async SendPasswordResetEmail(email) {
      return new Promise((resolve) => {
        sendPasswordResetEmail(client.auth, email)
          .then(() => {
            // console.log("Password reset email sent successfully");
            resolve(true);
          })
          .catch((error) => {
            // console.error("Error sending password reset email:", error);
            resolve(false);
          });
      });
    }

    //Sign in with email and password
    async EmailSignIn(email, password) {
      return new Promise((resolve) => { 
        signInWithEmailAndPassword(client.auth, email, password)
          .then((userCredential) => {
            // Login successful, do something with userCredential.user
            const user = userCredential.user;
            client.SetUser(user);
            // console.log('Logged in user:', client.GetUser());
            resolve(true);
          })
          .catch((error) => {
            // Handle login error
            console.log('Login error:', error);
            resolve(false);
          });
      })
    }
    
    // Function to sign out the user
    SignOut() {
      client.auth.signOut()
        .then(() => {
          console.log("User signed out successfully");
          client.SetUser(undefined);
          // Additional actions after sign-out
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    }

    SendSignInLinkToEmail(email) {
        if(typeof window == 'undefined') return;
        const actionCodeSettings = {
          url: `${window.location.origin}`, // URL where the user will be redirected after clicking the sign-in link
          handleCodeInApp: true, // Display the sign-in link in the app instead of opening it in a web browser
        };
      
        sendSignInLinkToEmail(client.auth, email, actionCodeSettings)
          .then(() => {
            // Sign-in link sent successfully
            console.log('Sign-in link sent to:', email);
          })
          .catch((error) => {
            // Handle sign-in link sending error
            console.log('Error sending sign-in link:', error);
          });
          window.localStorage.setItem('emailForSignIn', email);
    }
     
    AuthWithEmailLink() {
        console.log("REAUTH with EmailLink");
        if(typeof window == "undefined") return;

        let email = window.localStorage.getItem('emailForSignIn');
        signInWithEmailLink(client.auth, email, window.location.href)
        .then((userCredential) => {
          // Reauthentication successful, do something with userCredential.user
          client.SetUser(userCredential.user);
          // console.log('USER AUTHENTICATED:', client.GetUser());
          return("Account created!")
        })
        .catch((error) => {
          // Handle reauthentication error
          // console.log('Reauthentication error:', error);
          return (error.message)
        });    
    }
}