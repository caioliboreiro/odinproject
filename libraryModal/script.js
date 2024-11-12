const showModalBtn = document.querySelector(".addBookBtn");
const bookModal = document.querySelector(".bookModal");
const closeModal = document.querySelector(".closeModal");
const submitBtn = document.querySelector(".submitBtn");
const booksArea = document.querySelector(".booksArea");

showModalBtn.addEventListener("click", () => {
  bookModal.showModal();
});

closeModal.addEventListener("click", () => {
  bookModal.close();
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  bookNameInput = document.querySelector("#bookName");
  bookAuthorInput = document.querySelector("#author");
  bookPagesInput = document.querySelector("#pagesNumber");
  wasReadInput = document.querySelector("#wasRead");

  if (
    bookName.value !== "" &&
    bookAuthorInput.value !== "" &&
    bookPagesInput.value !== ""
  ) {
    const newBook = new Book(
      bookName.value,
      bookAuthorInput.value,
      bookPagesInput.value,
      wasReadInput.checked
    );
    addBookToLibrary(newBook);
    showBooks();
  }

  bookNameInput.value = "";
  bookAuthorInput.value = "";
  bookPagesInput.value = "";
  wasReadInput.checked = false;

  bookModal.close();
});

booksArea.addEventListener("click", (event) => {
  if (event.target.classList.contains("removeBtn")) {
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
    event.target.style.backgroundColor = foundBook.read ? "#30011e" : "tomato";
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
  bookDiv.style.backgroundColor = isRead ? "#30011e" : "tomato";

  // Creating the top section of the book div
  const topSection = document.createElement("div");
  topSection.classList.toggle("topSection");

  // Creating the author Name
  const author = document.createElement("p");
  author.textContent = bookAuthor;

  // Creating the close button
  const closeBtn = document.createElement("img");
  closeBtn.classList.toggle("removeBtn");
  closeBtn.src = "img/close.svg";

  // Appending to the top section
  topSection.appendChild(author);
  topSection.appendChild(closeBtn);

  // Creating the middle section of the book div
  const midSection = document.createElement("div");
  midSection.classList.toggle("midSection");

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
