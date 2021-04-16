/* Functions for category.html to Dynamically Create items and Write into Database */

// Retrieve from collection and dynamically display grocery items.
function displayCategory() {
    let params = (new URL(document.location)).searchParams;
    let pageId = params.get("order");
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

// Helper function for displayCategory to create HTML elements.
function displayEachCategory(doc) {
    var name = doc.data().name;
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
    setTimeout(function() {addCartListenerById(id, price, description, name)}, 1000);  // There must be a Timeout otherwise function will invoke immediately causing an error.
    $("#categories-go-here").append('</div>')
    $("#categories-go-here").append('</div>')
    $("#categories-go-here").append('</div>')
}

// Retrieve item information by using ID of 'Add To Cart' button and creating a new field in the current User logged in.
function addCartListenerById(docid, itemPrice, itemDescription, itemName) {
    document.getElementById(docid).addEventListener("click", function () {
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("users")
                .doc(user.uid) // Retrieve User collection based on ser who is logged in
                .set({
                    CartByID: firebase.firestore.FieldValue.arrayUnion({ // Create and array containing a Map
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

displayCategory();