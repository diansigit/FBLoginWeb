
  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      FB.api('/me?fields=id,name,email,picture{url}', function(response) {
          console.log('Successful login for: ',response.picture.data.url);
          document.getElementById('thumbnail').src = response.picture.data.url;
          document.getElementById('picture').src = response.picture.data.url;
          document.getElementById('name').innerHTML = response.name;
          document.getElementById('id').innerHTML = response.id;
          document.getElementById('email').innerHTML = response.email;
        });
    } else {
      // The person is not logged into your app or we are unable to tell.
    }
  }

  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  function facebookLogin(){
    FB.login(function(response) {
        if (response.authResponse) {
         console.log('Welcome!  Fetching your information.... ');
         FB.api('/me', function(response) {
           console.log('Good to see you, ', JSON.stringify(response));
           window.location = 'http://fblogin.web/home.html'
         });
        } else {
         console.log('User cancelled login or did not fully authorize.');
        }
    }, {scope: 'public_profile,email'});
  }

  function facebookLogout(){
    FB.logout(function(response) {
       // Person is now logged out
       window.location = 'http://fblogin.web/'
    });
  }

  window.fbAsyncInit = function() {
      FB.init({
        appId      :  '322444474864272',
        cookie     : true,  // enable cookies to allow the server to access 
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      });

      // Now that we've initialized the JavaScript SDK, we call 
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.

      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });

  };