
// Say Hello to User Upon Signing in
function sayHello() {
    firebase.auth().onAuthStateChanged(function (somebody) {
        if (somebody) {
            console.log(somebody.uid);
            db.collection("users")
                .doc(somebody.uid)
                .get()                  //READ!!!
                .then(function (doc) {
                    console.log(doc.data().name);
                    var n = doc.data().name;
                    $("#name-goes-here").text(n);
                    // get other things and do other things for this person
                })

        }
    })
}

// Retrieve code "TS" from database and display on profile.
function displayCities() {
    db.collection("coverage").get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          var code = doc.data().code;
          console.log(code);
          var name = doc.data().strata;
          console.log(name);
          if ((code) === "TS")
            document.getElementById(code).innerText = name;
        })

      })
  }

// Retrieve address code "oldpeople" from database and display address on profile.
function displayAddress() {
    db.collection("coverage").get()
      .then(function (snap) {
        snap.forEach(function (doc) {
          var addressCode = doc.data().ad_code;
          console.log(addressCode);
          var address = doc.data().address;
          console.log(address);
          if (addressCode === "oldpeople") {
            document.getElementById(addressCode).innerText = address;
          }
        })
      })
  }

// Set a timeout and display image after retrieving user "img" number from database.
function displayImage() {
    db.collection("users").get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var namedisplayed = document.getElementById("name-goes-here").innerText;
                var imgNum = doc.data().img;
                var user_name = doc.data().name;
                if (namedisplayed == user_name) {
                    document.getElementById('userImage').src = "https://randomuser.me/api/portraits/men/" + imgNum + ".jpg";
            }
          })
    })
}

// Drive the profile page functions.
function invokeProfilePage(){
    sayHello();
    displayCities();
    displayAddress();
    setTimeout(function(){displayImage()}, 500);
}

invokeProfilePage()
