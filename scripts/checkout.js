/* Functions for checkout.html to read / check out and write into database */

// Dynamically display items in user field CartByID into the checkout items div.
function displayYourCart() {
    var totalprice = 0;
    var itemsList = []
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
            .doc(user.uid) // Retrieve User collection based on User who is logged in
            .onSnapshot(function (doc) {
                var items = doc.data().CartByID;
                items.forEach(function (item, i) {
                    let name = item["name"];
                    let price = item["price"];
                    let description = item["description"];
                    totalprice += parseFloat(price) // Increment totalprice as items are looped through
                    itemsList.push(name)
                    $('#item-checkout').append('<li class="list-group-item d-flex justify-content-between lh-sm"><div><h6 class="my-0">' + name + '</h6><small class="text-muted">' + description + '</small></div><span class="text-muted">' + price + '</span></li>')
                })
                $('#item-checkout').append('<li class="list-group-item d-flex justify-content-between"><span>Total</span><strong>$' + totalprice.toFixed(2) + '</strong></li>')
                $('#cart-quantity').append('<span class="text-success">Your cart</span><span class="badge bg-success rounded-pill">' + itemsList.length + '</span>')
            })

    })
    return itemsList // Return item list to be used by gatherCheckoutInformation.
}


// Retrieve user checkout information and invoke into sendOrderToFirebase.
function gatherCheckoutInformation(itemsList) {
    let storeCheckoutFirstName = document.getElementById('firstName').value; // first name
    let storeCheckoutLastName = document.getElementById('lastName').value; // last name
    let storeCheckoutEmail = document.getElementById('email').value; // email address
    let storeCheckoutAddress = document.getElementById('address').value; // address
    let storeCheckoutCountry = document.getElementById('country').value; // country
    let storeCheckoutState = document.getElementById('state').value; // province/territory
    let storeCheckoutZip = document.getElementById('zip').value; // zip code
    let storeCheckoutCCName = document.getElementById('cc-name').value; // credit card name
    let storeCheckoutCCNumber = document.getElementById('cc-number').value; // credit card number
    let storeCheckoutCCExpiration = document.getElementById('cc-expiration').value; // credit card expiration date
    let storeCheckoutCCccv = document.getElementById('cc-cvv').value; // credit card cvv

    // Send this information to firebase
    sendOrderToFirebase(storeCheckoutFirstName, storeCheckoutLastName, storeCheckoutEmail, storeCheckoutAddress, storeCheckoutCountry, storeCheckoutState, storeCheckoutZip, itemsList, storeCheckoutCCName, storeCheckoutCCNumber, storeCheckoutCCExpiration, storeCheckoutCCccv)
}

// Send information to firebase collection UserOrder.
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

// Delete user's CartById field.
function deleteUserCart() {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
            .doc(user.uid) // Retrieve User collection based on User who is logged in
            .update({
                CartByID: firebase.firestore.FieldValue.delete()
            })

    })
}

// Drive the checkout page.
function invokeCheckoutPage(){
    var checkoutItems = displayYourCart()
    document.getElementById('place-order').addEventListener('click', function () {
        gatherCheckoutInformation(checkoutItems);
    })
    document.getElementById('return-home').addEventListener('click', function() {
        deleteUserCart()
    })
}

invokeCheckoutPage()
