// Encapsulate the code within an object
const libraryApp = {
  myLibrary: [],
  booklist: document.getElementById("booklist"),
  newBookButton: document.getElementById("add_book"),
  newBookForm: document.getElementById("new_book_form"),
  submitBookButton: document.getElementById("submit_book"),
  inputTitle: document.getElementById("title"),
  inputAuthor: document.getElementById("author"),
  inputPages: document.getElementById("pages"),
  inputRead: document.getElementById("read"),

  // Initialize the library
  init() {
    this.setupEventListeners();
    this.populateLibrary();
  },

  // Add event listeners
  setupEventListeners() {
    this.newBookButton.addEventListener("click", () => {
      this.newBookForm.style.visibility = "visible";
    });

    this.submitBookButton.addEventListener("click", () => {
      this.newBookForm.style.visibility = "hidden";
    });

    this.newBookForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.getData();
    });

    this.booklist.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete_button")) {
        const index = e.target.parentNode.dataset.index;
        this.deleteBook(index);
      } else if (e.target.classList.contains("read_button")) {
        const index = e.target.parentNode.dataset.index;
        this.toggleReadStatus(index);
      }
    });
  },

  // Populate the library with books
  populateLibrary() {
    this.booklist.innerHTML = "";
    this.myLibrary.forEach((book, index) => {
      const div = document.createElement("div");
      div.dataset.index = index;
      div.classList.add("book_container");
      this.addBookInfo(div, book);
      this.booklist.prepend(div);
    });
  },

  // Add book information to a book container
  addBookInfo(container, book) {
    container.appendChild(this.createParagraph(book.title));
    container.appendChild(this.createParagraph(book.author));
    container.appendChild(this.createParagraph(book.pages));
    this.addBookButtons(container, book);
  },

  // Create a paragraph element
  createParagraph(text) {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  },

  // Add read and delete buttons to a book container
  addBookButtons(container, book) {
    const readButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    readButton.classList.add("read_button");
    deleteButton.classList.add("delete_button");
    deleteButton.textContent = "Remove";

    if (book.read) {
      readButton.textContent = "Read: Yes";
    } else {
      readButton.textContent = "Read: No";
    }

    container.appendChild(readButton);
    container.appendChild(deleteButton);
  },

  // Create a book object
  createBook(title, author, pages, read) {
    return {
      title,
      author,
      pages,
      read,
      info() {
        const readStatus = this.read ? "read" : "not read yet";
        return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}`;
      },
    };
  },

  // Delete a book from the library
  deleteBook(index) {
    this.myLibrary.splice(index, 1);
    this.populateLibrary();
  },

  // Toggle the read status of a book
  toggleReadStatus(index) {
    const book = this.myLibrary[index];
    book.read = !book.read;
    this.populateLibrary();
  },

  // Get data from the form and add a new book to the library
  getData() {
    const title = this.inputTitle.value;
    const author = this.inputAuthor.value;
    const pages = this.inputPages.value;
    const read = this.inputRead.checked;
    this.addBookToLibrary(title, author, pages, read);
  },

  // Add a new book to the library
  addBookToLibrary(title, author, pages, read) {
    const newBook = this.createBook(title, author, pages, read);
    this.myLibrary.push(newBook);
    this.populateLibrary();
  },
};

// Initialize the library app
libraryApp.init();
