
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

// Read database and display items onto main.html
function displayItems() {
    db.collection('grocery_items').get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var n = doc.data().name;
                var itemcode = doc.data().code;
                document.getElementById(itemcode).innerText = n
            })
        })
}

// Search button event listener
function getItem() {
    document.getElementById("submit").addEventListener('click', function () {
        let item = document.getElementById("search-item").value;
        console.log(item);

        //read collection in database
        db.collection("cities")
            .where("name", "==", location)
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    console.log(doc.data());
                    //Retrieve generated searchresult page
                })
            })
    })
}

// Functions for eligible.html form submission
function gatherValues() {
    let storeRecipientName = document.getElementById('recipient-name').value;
    let storeRecipientPhoneNumber = document.getElementById('recipient-phone-number').value;
    let storeRecipientAddress = document.getElementById('recipient-address').value;
    let storeRecipientCity = document.getElementById('recipient-city').value;
    let storeRecipientMessage = document.getElementById('message-text').value;
    sendRequestToFirebase(storeRecipientName, storeRecipientPhoneNumber, storeRecipientAddress, storeRecipientCity, storeRecipientMessage);

}

function resetValues() {
    document.getElementById('recipient-name').value = "";
    document.getElementById('recipient-phone-number').value = "";
    document.getElementById('recipient-address').value = "";
    document.getElementById('recipient-city').value = "";
    document.getElementById('message-text').value = "";
}

function sendRequestToFirebase(userName, userPhone, userAddress, userCity, userMessage) {
    var locationRef = db.collection("LocationRequest");
    locationRef.add({
        name: userName,
        phoneNumber: userPhone,
        address: userAddress,
        city: userCity,
        message: userMessage
    });
}

// Functions for faq.html to read information from database
function displayQuestion() {
    db.collection("FAQ").get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var n = doc.data().question;
                console.log(n);
                var questionid = doc.data().qcode;
                console.log(questionid);
                document.getElementById(questionid).innerText = n;
            })

        })
}
function displayAnswer() {
    db.collection("FAQ").get()
        .then(function (snap) {
            snap.forEach(function (doc) {
                var n = doc.data().answer;
                console.log(n);
                var answerid = doc.data().acode;
                console.log(answerid);
                document.getElementById(answerid).innerText = n;
            })

        })
}