var names = /^[A-Z][a-z]+$/,
    telephones = /^[+]?[0-9]{6,20}$/,
    emails = /^[a-z,0-9,A-Z,_]{5,20}@[a-z,0-9]{1,20}.[a-z]{2,5}$/,
    editIndex;

function Contact(n, s, t, e) {
    this.name = n;
    this.surname = s;
    this.telephone = t;
    this.email = e;
    return this;
}

function PhoneBook() {
    this.contacts = new Array();
    this.editContact = edit;
    this.deleteContact = del;
    this.addContact = add;
    return this;
}

function add() {

    if (names.test(document.form.name.value) &&
        names.test(document.form.surname.value) &&
        telephones.test(document.form.telephone.value) &&
        emails.test(document.form.email.value)) {

        this.contacts.push(new Contact(document.form.name.value, document.form.surname.value, document.form.telephone.value, document.form.email.value));
        addPerson();
    } else {
        alert("Check out inputed data");
    }
}

function del() {

}


function edit() {

}

function erase() {
    phoneBook.deleteContact();
}

function change() {
    phoneBook.editContact();
}

function save() {
    var data = {
        name: document.form.name.value,
        surname: document.form.surname.value,
        telephone: document.form.telephone.value,
        email: document.form.email.value
    }
    document.cookie = JSON.stringify(data);

}

function addC() {
    /*if (document.cookie != 0) {
     var newData = JSON.parse(document.cookie);
     document.form.name.value = newData["name"];
     document.form.surname.value = newData["surname"];
     document.form.telephone.value = newData["telephone"];
     document.form.email.value = newData["email"];
     }*/
}

function clear2() {
    document.cookie = 0;
    alert(document.cookie);
}

var phoneBook = new PhoneBook();
var phoneBook = new PhoneBook();

function checker(obj) {
    if (obj == document.form.name) {
        if (names.test(document.form.name.value)) {
            document.form.name.style.color = "green";
        } else {
            document.form.name.style.color = "red";
        }
    }
    if (obj == document.form.surname) {
        if (names.test(document.form.surname.value)) {
            document.form.surname.style.color = "green";
        } else {
            document.form.surname.style.color = "red";
        }
    }
    if (obj == document.form.telephone) {
        if (telephones.test(document.form.telephone.value)) {
            document.form.telephone.style.color = "green";
        } else {
            document.form.telephone.style.color = "red";
        }
    }
    if (obj == document.form.email) {
        if (emails.test(document.form.email.value)) {
            document.form.email.style.color = "green";
        } else {
            document.form.email.style.color = "red";
        }
    }
}

function addPerson() {
    var newPerson = document.getElementsByClassName("person")[0].cloneNode(true);
    newPerson.style.display = "block";
    document.getElementById("personlist").appendChild(newPerson);
    newPerson.getElementsByClassName("nameP")[0].innerHTML = phoneBook.contacts[phoneBook.contacts.length - 1].name;
    newPerson.getElementsByClassName("surnameP")[0].innerHTML = phoneBook.contacts[phoneBook.contacts.length - 1].surname;
    newPerson.getElementsByClassName("telephoneP")[0].innerHTML = phoneBook.contacts[phoneBook.contacts.length - 1].telephone;
    newPerson.getElementsByClassName("emailP")[0].innerHTML = phoneBook.contacts[phoneBook.contacts.length - 1].email;
}

function addNewPerson() {
    document.getElementById("regpopup").style.display = "block";
    document.form.name.value = "";
    document.form.surname.value = "";
    document.form.telephone.value = "";
    document.form.email.value = "";
    $("#OK").show();
    $("#edit").hide();
}

function hideFormQ() {
    document.getElementById("regpopup").style.display = "none";
}

$(function () {
    $("input").change(function () {
        checker(this);
    });
    $("#OK").click(function () {
        phoneBook.addContact();
        $(".editbutton").off('click');
        $(".editbutton").click(function () {
            $("#regpopup").dialog("open");
            $("#OK").hide();
            $("#edit").show();

            document.form.name.value = phoneBook.contacts[$(".editbutton").index(this) - 1].name;
            document.form.surname.value = phoneBook.contacts[$(".editbutton").index(this) - 1].surname;
            document.form.telephone.value = phoneBook.contacts[$(".editbutton").index(this) - 1].telephone;
            document.form.email.value = phoneBook.contacts[$(".editbutton").index(this) - 1].email;
            editIndex = $(".editbutton").index(this) - 1;
        });

        $(".deletebutton").off('click');
        $(".deletebutton").click(function () {
            $(this).parent().remove();
            phoneBook.contacts.splice($(".deletebutton").index(this) - 1, 1);
        });
        $("#regpopup").dialog("close");
    });
    $("#CANCEL").click(function () {
        $("#regpopup").dialog("close");
        document.form.name.value = "";
        document.form.surname.value = "";
        document.form.telephone.value = "";
        document.form.email.value = "";
    });

    $("#addpic").click(function () {
        $("#regpopup").dialog("open");
        document.form.name.value = "";
        document.form.surname.value = "";
        document.form.telephone.value = "";
        document.form.email.value = "";
        $("#OK").show();
        $("#edit").hide();
    });

    $("#edit").click(function () {
        phoneBook.contacts[editIndex].name = document.form.name.value;
        phoneBook.contacts[editIndex].surname = document.form.surname.value;
        phoneBook.contacts[editIndex].telephone = document.form.telephone.value;
        phoneBook.contacts[editIndex].email = document.form.email.value;

        document.getElementsByClassName("nameP")[editIndex + 1].innerHTML = phoneBook.contacts[editIndex].name;
        document.getElementsByClassName("surnameP")[editIndex + 1].innerHTML = phoneBook.contacts[editIndex].surname;
        document.getElementsByClassName("telephoneP")[editIndex + 1].innerHTML = phoneBook.contacts[editIndex].telephone;
        document.getElementsByClassName("emailP")[editIndex + 1].innerHTML = phoneBook.contacts[editIndex].email;
        $("#regpopup").dialog("close");
    });

    $("#regpopup").dialog({
        modal: true,
        height: 400,
        width: 400
    });
    $("#regpopup").dialog("close");

    $("#edit").hide();
    $("#regpopup").close(function () {
        document.form.name.value = "";
        document.form.surname.value = "";
        document.form.telephone.value = "";
        document.form.email.value = "";
    });
});





