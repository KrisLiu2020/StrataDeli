/* Functions for faq.html to read information from database */

// Retrieve Question from Database and append into #questionid.
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

// Retrieve Answer from Database and append into #answerid.
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

// Toggle hide and show accordion on click.
function showAndHideAccordion(){
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }

  // Drive the faq accordions.
  function invokeAccordion(){
    showAndHideAccordion();
    displayQuestion();
    displayAnswer();
  }

  invokeAccordion()
  