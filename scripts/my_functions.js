
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


// Functions for checkout.html to read / check out and write into database
function displayYourCart() {
    var totalprice = 0;
    var itemsList = []
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
            .doc(user.uid)
            .onSnapshot(function (doc) {
                var items = doc.data().CartByID;
                items.forEach(function (item, i) {
                    let name = item["name"];
                    let price = item["price"];
                    let quantity = item["quantity"];
                    let description = item["description"];
                    totalprice += parseFloat(price)
                    itemsList.push(name)
                    $('#item-checkout').append('<li class="list-group-item d-flex justify-content-between lh-sm"><div><h6 class="my-0">' + name + '</h6><small class="text-muted">' + description + '</small></div><span class="text-muted">' + price + '</span></li>')
                })
                $('#item-checkout').append('<li class="list-group-item d-flex justify-content-between"><span>Total</span><strong>$' + totalprice.toFixed(2) + '</strong></li>')
                $('#cart-quantity').append('<span class="text-success">Your cart</span><span class="badge bg-success rounded-pill">' + itemsList.length + '</span>')
            })

    })
    return itemsList
}

function gatherCheckoutInformation(itemsList) {
    let storeCheckoutFirstName = document.getElementById('firstName').value;
    let storeCheckoutLastName = document.getElementById('lastName').value;
    let storeCheckoutEmail = document.getElementById('email').value;
    let storeCheckoutAddress = document.getElementById('address').value;
    let storeCheckoutCountry = document.getElementById('country').value;
    let storeCheckoutState = document.getElementById('state').value;
    let storeCheckoutZip = document.getElementById('zip').value;
    let storeCheckoutCCName = document.getElementById('cc-name').value;
    let storeCheckoutCCNumber = document.getElementById('cc-number').value;
    let storeCheckoutCCExpiration = document.getElementById('cc-expiration').value;
    let storeCheckoutCCccv = document.getElementById('cc-cvv').value;
    sendOrderToFirebase(storeCheckoutFirstName, storeCheckoutLastName, storeCheckoutEmail, storeCheckoutAddress, storeCheckoutCountry, storeCheckoutState, storeCheckoutZip, itemsList, storeCheckoutCCName, storeCheckoutCCNumber, storeCheckoutCCExpiration, storeCheckoutCCccv)
}

function sendOrderToFirebase(firstName, lastName, email, address, country, state, zip, items, ccname, ccnum, ccexp, cccvv) {
    var orderRef = db.collection("UserOrder");
    orderRef.add({
        name: firstName,
        surname: lastName,
        email: email,
        address: address,
        country: country,
        state: state,
        zip: zip,
        "credit card name": ccname,
        "credit card number": ccnum,
        "credit card expiration date": ccexp,
        "credit card cvv": cccvv,
        item: items
    });
}

function deleteUserCart() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")   //part of the user's doc
            .doc(user.uid)
            .update({
                CartByID: firebase.firestore.FieldValue.delete()
            })

    })
}

// Functions for item.html to write into Database
function addCart() {
    document.getElementById('carrot')
        .addEventListener('click', function () {
            console.log('carrot clicked!')
            db.collection('veggies')
                .doc('carrot')
                .update({
                    counter: firebase.firestore.FieldValue.increment(1)
                })
            console.log("increment");

            var counterID = document.getElementById('counterID');
            if (counterID == null) {
                displayCounter();
            } else {
                counterID.innerHTML = parseInt(counterID.innerHTML) + 1;
            }
        })
}

function displayCounter() {
    db.collection('veggies').doc('carrot')
        .get()
        .then(function (doc) {
            let counter = doc.data().counter
            console.log('doc', doc.data().counter)
            $("#item-number-goes-here").append('<p><span id="counterID">' + counter + '</span> items in your cart</p>')
        })
}

function addCartForItem(docid) {
    document.getElementById(docid).addEventListener("click", function () {
        console.log("adding " + docid + " to cart");
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("users")   //part of the user's doc
                .doc(user.uid)
                .set({
                    CartByID: firebase.firestore.FieldValue.arrayUnion({
                        name: "Carrot",
                        quantity: 1,
                        price: 1.78,
                        description: "Arrival Date: Apr 16"
                    })
                }, {
                    merge: true
                });
        })
    })
}

// Functions for Category.html to Dynamically Create items and Write into Database

function displayCategory() {
    let params = (new URL(document.location)).searchParams;
    let pageId = params.get("order");
    console.log('pageId', pageId)
    if (pageId == 'veggies')
        db.collection('veggies')
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    displayEachCategory(doc)
                })
            })
    else if (pageId == 'meat')
        db.collection('meat')
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    displayEachCategory(doc)
                })
            })
    else if (pageId == 'dairy')
        db.collection('dairy')
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    displayEachCategory(doc)
                })
            })
    else if (pageId == 'bakery')
        db.collection('bakery')
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    displayEachCategory(doc)
                })
            })
    else if (pageId == 'frozen')
        db.collection('frozen')
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    displayEachCategory(doc)
                })
            })
    else if (pageId == 'beauty')
        db.collection('beauty')
            .get()
            .then(function (snap) {
                snap.forEach(function (doc) {
                    displayEachCategory(doc)
                })
            })
}

function displayEachCategory(doc) {
    // console.log('doc', doc.id)
    var name = doc.data().name;
    // console.log('name', name)
    var img_path = doc.data().path;
    var intro = doc.data().intro;
    var price = doc.data().price;
    var description = doc.data().description;
    var id = doc.id
    $("#categories-go-here").append('<br><br>')
    $("#categories-go-here").append('<div class="card">')
    $("#categories-go-here").append("<img src=' " + img_path + " ' alt='Avatar' style='width:30%'>")
    $("#categories-go-here").append('<div class="container">')
    $("#categories-go-here").append('<h4> <b> <a href="item.html?item=' + id + '">' + name + '</a></b></h4>')
    $("#categories-go-here").append('<p>' + intro + '</p>')
    $("#categories-go-here").append('<p> <b>price</b> ' + price + ' ea. </p>')
    $("#categories-go-here").append('<button type="button" data-bs-toggle="modal" data-bs-target="#add-to-cart-response" class="green-button-shadow" id="' + id + '" style="width: 150px">Add to Cart</button>')
    setTimeout(function() {addCartListenerById(id, price, description, name)}, 1000);
    $("#categories-go-here").append('</div>')
    $("#categories-go-here").append('</div>')
    $("#categories-go-here").append('</div>')
}


function addCartListenerById(docid, itemPrice, itemDescription, itemName) {
    document.getElementById(docid).addEventListener("click", function () {
        console.log("adding " + docid + " to cart");
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("users")   //part of the user's doc
                .doc(user.uid)
                .set({
                    CartByID: firebase.firestore.FieldValue.arrayUnion({
                        name : itemName,
                        quantity: 1,
                        price: itemPrice,
                        description: itemDescription
                    })
                }, {
                    merge: true
                });
        })
    })
}