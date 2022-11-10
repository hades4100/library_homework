var userslist = [];
var books = [];
class user {
  constructor(firstname, lastname, city) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.city = city;
    this.userbooks = [];
  }
}

class book {
  constructor(name, author, copies) {
    this.name = name;
    this.author = author;
    this.copies = copies;
  }
}
books.push(new book("harry potter", "J.K Rowling", 3));
books.push(new book("lord of the ring", "J.R.R Tolkin", 5));
books.push(new book("1984", "George Orwell", 8));

function userposition(firstname) {
  var position;
  for (let i = 0; i < userslist.length; i++) {
    if (firstname == userslist[i].firstname) {
      position = i;
    }
  }
  return position;
}
function adduser() {
  let firstname = prompt("enter your first name:");
  let lastname = prompt("enter last name:");
  let city = prompt("enter your city:");
  userslist.push(new user(firstname, lastname, city));
  displayuser(firstname, lastname, city, userposition(firstname));
}

function clearpage() {
  document.getElementById("mainbox").innerHTML = "";
}

function displayuser(firstname, lastname, city, position) {
  let box = document.getElementById("mainbox");
  let newdiv = document.createElement("div");
  newdiv.className = "userbox";
  box.appendChild(newdiv);

  let para = document.createElement("p");
  para.setAttribute("id", "para");
  let tx1 = document.createTextNode("Library User No " + position);
  para.appendChild(tx1);
  newdiv.appendChild(para);

  let para2 = document.createElement("p");
  let tx2 = document.createTextNode("name: " + firstname + " " + lastname);
  para2.appendChild(tx2);
  newdiv.appendChild(para2);

  let para3 = document.createElement("p");
  let tx3 = document.createTextNode("lives in: " + city);
  para3.appendChild(tx3);
  newdiv.appendChild(para3);
}

function displayaddoption() {
  let bn = document.createElement("button");
  bn.setAttribute("id", "adduser");
  bn.innerHTML = "+";
  bn.setAttribute("onclick", "adduser()");
  let newdiv = document.createElement("div");
  newdiv.className = "userbox";
  newdiv.appendChild(bn);
  let box = document.getElementById("mainbox");
  box.appendChild(newdiv);
}

function users() {
  clearpage();
  let booksdiv = document.getElementById("booksdiv");
  booksdiv.style.display = "none";
  console.log(userslist);
  for (let i = 0; i < userslist.length; i++) {
    displayuser(userslist[i].firstname, userslist[i].lastname, userslist[i].city, i);
  }
  displayaddoption();
}
function showbooks() {
  clearpage();
  let booksdiv = document.getElementById("booksdiv");
  booksdiv.style.display = "flex";
  addinfoall();
}
function addinfoall() {
  var info1collection = document.querySelectorAll("[id='info1']");
  var info2collection = document.querySelectorAll("[id='info2']");

  for (let i = 0; i < books.length; i++) {
    info1collection[i].innerText = "Author: " + books[i].author;
    info2collection[i].innerText = "Copies Available: " + books[i].copies;
  }
}

window.onload = addinfoall();

function borrow(bookindex) {
  let firstname = prompt("enter your first name: ");
  let userindex = userposition(firstname);
  if (firstname == undefined) {
    alert("no such user");
  } else {
    userslist[userindex].userbooks.push("harry potter");
    books[bookindex].copies = books[bookindex].copies - 1;
    console.log(userslist[userindex].userbooks);
    console.log(books[bookindex].copies);
  }
}

//below is modals script
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});
function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}
function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}
