/* Functions for item.html to write into Database */

// Increment counter of carrot in veggies collection.
function addCart() {
    document.getElementById('carrot')
        .addEventListener('click', function () {
            db.collection('veggies')
                .doc('carrot')
                .update({
                    counter: firebase.firestore.FieldValue.increment(1)
                })
            var counterID = document.getElementById('counterID');
            if (counterID == null) {
                displayCounter();
            } else {
                counterID.innerHTML = parseInt(counterID.innerHTML) + 1;
            }
        })
}

// Dynamically modify 'items in you cart" on item.html.
function displayCounter() {
    db.collection('veggies').doc('carrot')
        .get()
        .then(function (doc) {
            let counter = doc.data().counter
            console.log('doc', doc.data().counter)
            $("#item-number-goes-here").append('<p><span id="counterID">' + counter + '</span> items in your cart</p>')
        })
}

// Retrieve item information by using ID of 'Add to Cart' button and creating a new field in the current User logged in.
function addCartForItem(docid) {
    document.getElementById(docid).addEventListener("click", function () {
        console.log("adding " + docid + " to cart");
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("users")   //part of the user's doc
                .doc(user.uid)
                .set({
                    CartByID: firebase.firestore.FieldValue.arrayUnion({
                        name: "Organic Carrot",
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

// Drive the item page to add carrot to cart and increment counter.
function invokeItemPage(){
    addCart();
    displayCounter();
    addCartForItem('carrot');
}

invokeItemPage()
   