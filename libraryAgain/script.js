const form = document.querySelector(".user-input");
const booksArea = document.querySelector(".booksArea");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const bookName = document.querySelector("#bookName");
  const author = document.querySelector("#author");
  const pages = document.querySelector("#pages");
  const wasRead = document.querySelector("#wasRead");

  if (bookName.value !== "" && author.value !== "" && pages.value !== "") {
    const newBook = new Book(
      bookName.value,
      author.value,
      pages.value,
      wasRead.checked
    );
    addBookToLibrary(newBook);
    showBooks();
  }

  bookName.value = "";
  author.value = "";
  pages.value = "";
  wasRead.checked = false;
});

booksArea.addEventListener("click", (event) => {
  if (event.target.classList.contains("closeBookBtn")) {
    bookTop = event.target.parentElement;
    bookDiv = bookTop.parentElement;
    console.log(bookTop);
    console.log(bookDiv);
    const foundBook = searchBook(bookDiv.children[1].firstChild.textContent);

    removeBook(foundBook);
    showBooks();
  } else if (event.target.classList.contains("book")) {
    bookDiv = event.target;
    const foundBook = searchBook(bookDiv.children[1].firstChild.textContent);
    toggleRead(foundBook);
    event.target.style.backgroundColor = foundBook.read ? "#00a8e0" : "tomato";
    bookDiv.children[1].lastChild.textContent = foundBook.read
      ? "read"
      : "not-read";
  }
});

const myLibrary = [];

function Book(name, author, pages, read) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function removeBook(book) {
  myLibrary.splice(myLibrary.indexOf(book), 1);
}

function searchBook(bookName) {
  for (let book of myLibrary) {
    if (book.name === bookName) {
      return book;
    }
  }
  return null;
}

function toggleRead(book) {
  book.read = !book.read;
}

function showBooks() {
  cleanBookSection();
  const bookSection = document.querySelector(".booksArea");
  console.log(myLibrary);

  for (let book of myLibrary) {
    const bookDiv = createBookDiv(
      book.author,
      book.name,
      book.read,
      book.pages
    );
    bookSection.appendChild(bookDiv);
  }
}

function createBookDiv(bookAuthor, bookName, isRead, bookPages) {
  // Creating the book div
  const bookDiv = document.createElement("div");
  bookDiv.classList.toggle("book");

  // Defining the background color of the bookDiv
  bookDiv.style.backgroundColor = isRead ? "#00a8e0" : "tomato";

  // Creating the top section of the book div
  const topSection = document.createElement("div");
  topSection.classList.toggle("book-top");

  // Creating the author Name
  const author = document.createElement("p");
  author.textContent = bookAuthor;

  // Creating the close button
  const closeBtn = document.createElement("img");
  closeBtn.classList.toggle("closeBookBtn");
  closeBtn.src = "close.svg";

  // Appending to the top section
  topSection.appendChild(author);
  topSection.appendChild(closeBtn);

  // Creating the middle section of the book div
  const midSection = document.createElement("div");
  midSection.classList.toggle("book-middle");

  // Creating the book title
  const title = document.createElement("h2");
  title.textContent = bookName;

  // Creating the read status
  const read = document.createElement("p");
  read.textContent = isRead ? "read" : "not-read";

  // Appending to the middle section
  midSection.appendChild(title);
  midSection.appendChild(read);

  // Creating the bottom section of the book div
  const pages = document.createElement("p");
  pages.textContent = `${bookPages} pages`;

  // Appending the sections to the book Div
  bookDiv.appendChild(topSection);
  bookDiv.appendChild(midSection);
  bookDiv.appendChild(pages);

  return bookDiv;
}

function cleanBookSection() {
  const bookSection = document.querySelector(".booksArea");
  bookSection.innerHTML = "";
}
