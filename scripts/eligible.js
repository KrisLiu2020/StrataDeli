/* Functions for eligible.html form submission */

// Retrieve user request form information and invoke into sendRequestToFirebase.
function gatherValues() {
    let storeRecipientName = document.getElementById('recipient-name').value;
    let storeRecipientPhoneNumber = document.getElementById('recipient-phone-number').value;
    let storeRecipientAddress = document.getElementById('recipient-address').value;
    let storeRecipientCity = document.getElementById('recipient-city').value;
    let storeRecipientMessage = document.getElementById('message-text').value;
    sendRequestToFirebase(storeRecipientName, storeRecipientPhoneNumber, storeRecipientAddress, storeRecipientCity, storeRecipientMessage);

}

// Reset values contained inside request form modal.
function resetValues() {
    document.getElementById('recipient-name').value = "";
    document.getElementById('recipient-phone-number').value = "";
    document.getElementById('recipient-address').value = "";
    document.getElementById('recipient-city').value = "";
    document.getElementById('message-text').value = "";
}

// Send information to firebase collection LocationRequest.
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

// Drive the eligible request form.
function invokeEligiblePage(){
    document.getElementById('submit-request').addEventListener('click', function () {
        gatherValues()
        resetValues()
    })
}

invokeEligiblePage()
