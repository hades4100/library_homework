const userslist = [];
const books = [];

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
    this.borrowers = [];
  }
}
books.push(new book("harry potter", "J.K Rowling", 1));
books.push(new book("lord of the ring", "J.R.R Tolkin", 5));
books.push(new book("1984", "George Orwell", 8));

//users functions
function adduser() {
  let firstname = prompt("enter your first name:");
  let lastname = prompt("enter last name:");
  let city = prompt("enter your city:");
  userslist.push(new user(firstname, lastname, city));
  displayuser(firstname, lastname, city, userposition(firstname));
}
function displayaddoption() {
  let bn = document.createElement("button");
  bn.setAttribute("id", "adduser");
  bn.innerHTML = "+";
  bn.setAttribute("onclick", "adduser()");
  let newdiv = document.createElement("div");
  newdiv.className = "userbox add";
  newdiv.appendChild(bn);
  let usersdiv = document.getElementById("usersdiv");
  usersdiv.appendChild(newdiv);
}
function displayuser(firstname, lastname, city, position) {
  let box = document.getElementById("usersdiv");
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

function users() {
  clearpage();
  document.getElementById("usersdiv").style.display = "flex";
  // for (let i = 0; i < userslist.length; i++) {
  //   displayuser(userslist[i].firstname, userslist[i].lastname, userslist[i].city, i);
  // }
  let collection = document.getElementsByClassName("userbox add");
  let myarray = Array.from(collection);
  if (myarray.length < 1) {
    displayaddoption();
  }
}

//books functions:

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
  copystatus();
}

function borrow(bookindex) {
  let firstname = prompt("enter your first name: ");
  let userindex = userposition(firstname);
  if (userindex == undefined) {
    alert("no such user");
  } else if (books[bookindex].copies < 1) {
    alert("no copies left");
  } else {
    userslist[userindex].userbooks.push(books[bookindex]);
    books[bookindex].copies = books[bookindex].copies - 1;
    books[bookindex].borrowers.push(userslist[userindex]);
  }
  addinfoall();
}

//report functions:
// class report

function printreport() {
  clearpage();
  let box = document.getElementById("reportdiv");
  box.style.display = "flex";
  let collection = document.getElementsByClassName("report");
  let myarray = Array.from(collection);
  if (myarray.length >= 1) {
    return;
  }
  let newdiv = document.createElement("div");
  newdiv.setAttribute("class", "report");
  box.appendChild(newdiv);
  for (let i = 0; i < books.length; i++) {
    let myspan = document.createElement("span");
    let tx1 = document.createTextNode(books[i].name + " borrowers list: ");
    myspan.style.textDecoration = "underline";
    myspan.appendChild(tx1);
    newdiv.appendChild(myspan);

    var ul = document.createElement("ul");
    newdiv.appendChild(ul);
    let temp = books[i].borrowers.length;
    console.log(books[i].borrowers);
    console.log("temp is: " + temp);
    for (let j = 0; j < temp; j++) {
      let line = document.createElement("li");
      line.innerText = books[i].borrowers[j].firstname + " " + books[i].borrowers[j].lastname + " from: " + books[i].borrowers[j].city;
      ul.appendChild(line);
    }
  }
}

// let bookreport = new report();

// **accessory functios**
function userposition(firstname) {
  var position;
  for (let i = 0; i < userslist.length; i++) {
    if (firstname == userslist[i].firstname) {
      position = i;
    }
  }
  return position;
}

function copystatus() {
  let list = document.getElementsByClassName("info2");
  let i = 0;
  for (let item of list) {
    if (books[i].copies < 1) {
      item.style.color = "red";
      i++;
    } else {
      item.style.color = "green";
    }
  }
}

function clearpage() {
  let x = document.getElementById("usersdiv");
  x.style.display = "none";
  let y = document.getElementById("booksdiv");
  y.style.display = "none";
  let z = document.getElementById("reportdiv");
  z.style.display = "none";
}

// modals script
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

//page boot
window.onload = addinfoall();
