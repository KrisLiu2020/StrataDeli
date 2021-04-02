
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

function displayItems() {
    db.collection('grocery_items').get()
    .then(function(snap){
        snap.forEach(function(doc){
            var n = doc.data().name;
            var itemcode = doc.data().code;
            document.getElementById(itemcode).innerText = n
        })
    })
}
