
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
sayHello();


// Read database and write items into main.html
function writeItems() {
    var itemsRef = db.collection('grocery_items')

    itemsRef.add({
        code: 'VEG',
        name: 'vegetables'
    });

    itemsRef.add({
        code: 'DAI',
        name: 'dairy'
    });

    itemsRef.add({
        code: 'MEAT',
        name: 'meat'
    });
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
getItem();
