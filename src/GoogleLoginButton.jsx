import React, { useEffect } from 'react';
import axios from 'axios';

const GoogleLoginButton = () => {
  useEffect(() => {
    const loadGoogleScript = () => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.onload = () => {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: '459436939630-gmr9om68rl4k65796pl67u80icgt2bcd.apps.googleusercontent.com', // Replace with your Google API client ID
          });
        });
      };
      document.head.appendChild(script);
    };

    loadGoogleScript();
  }, []);

  const handleGoogleLogin = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();

    auth2.signIn().then(googleUser => {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Name: ' + profile.getName());
      console.log('Email: ' + profile.getEmail());

      // Access the Google ID token
      const id_token = googleUser.getAuthResponse().id_token;
      console.log('ID Token: ' + id_token);

      // Now you can use the Google ID token as needed (e.g., send it to your server for authentication)
      // For simplicity, we'll just log it for now
      axios.post('http://localhost:3000/', { id_token })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Google login error:', error);
        });
    });
  };

  return <button onClick={handleGoogleLogin}>Login with Google</button>;
};

export default GoogleLoginButton;