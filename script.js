const bookone = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);
const booktwo = new Book("GOT", "J.R.R. Martin", 598, true);
const myLibrary = [bookone, booktwo];

const booklist = document.getElementById("booklist");
const newBookButton = document.getElementById("add_book");
const newBookForm = document.getElementById("new_book_form");
const submitBookButton = document.getElementById("submit_book");
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputRead = document.getElementById("read");

//const bookContainers = document.getElementsByClassName("book_container")

function create_para(text) {
  let Paragraph = document.createElement("p");
  let info = document.createTextNode(`${text}`);
  Paragraph.appendChild(info);
  return Paragraph;
}

function add_book_info(element, book) {
  element.appendChild(create_para(book.title));
  element.appendChild(create_para(book.author));
  element.appendChild(create_para(book.pages));
  book_buttons(element, book);
}

function book_buttons(element, book) {
  let read_button = document.createElement("button");
  if (book.read == true) {
    let button_text = document.createTextNode("Read: Yes");
    read_button.appendChild(button_text);
  } else if (book.read == false) {
    let button_text = document.createTextNode("Read: No");
    read_button.appendChild(button_text);
  }
  let delete_button = document.createElement("button");
  let delete_button_text = document.createTextNode("Remove");
  delete_button.classList.add("delete_button");
  read_button.classList.add("read_button");
  delete_button.appendChild(delete_button_text);
  element.appendChild(read_button);
  element.appendChild(delete_button);
}

function populate_library() {
  booklist.textContent = "";
  myLibrary.forEach(function (book, index) {
    var Div = document.createElement("div");
    Div.setAttribute("data", index);
    booklist.prepend(Div);
    add_book_info(Div, book);
    Div.classList.add("book_container");
  });
}

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}
Book.prototype.info = function () {
  let readstatus;
  if (this.read == true) {
    readstatus = "read";
  } else if (this.read == false) {
    readstatus = "not read yet";
  }
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readstatus} `;
};

function deleteBook(index) {
  myLibrary.splice(index, 1);
  populate_library();
}

booklist.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete_button")) {
    //remove the book
    let index = e.target.parentNode.getAttribute("data");
    console.log(index);
    deleteBook(index);
  } else if (e.target.classList.contains("read_button")) {
    //change read status
    alert("book read");
  }
});

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  populate_library();
}

function getData() {
  let title = inputTitle.value;
  let author = inputAuthor.value;
  let pages = inputPages.value;
  let read = inputRead.value;
  addBookToLibrary(title, author, pages, read);
}

newBookButton.addEventListener("click", () => {
  newBookForm.style.visibility = "visible";
});

submitBookButton.addEventListener("click", () => {
  newBookForm.style.visibility = "hidden";
});

newBookForm.addEventListener("submit", function (e) {
  e.preventDefault();
  getData();
});

// Add book
// function addBookToLibrary() {}
populate_library();
