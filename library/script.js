class Library {
  static books = [];

  static addBookToLibrary(Book) {
    this.books.push(Book);
  }

  static printBooks() {
    console.log(this.books);
    for (let i = 0; i < this.books.length; i++) {
      if (!this.books[i].shown) {
        const my_book = document.createElement("div");
        my_book.classList.add("book");

        const author = document.createElement("p");
        author.textContent = this.books[i].author;
        my_book.appendChild(author);

        const title = document.createElement("h1");
        title.textContent = this.books[i].title;
        my_book.appendChild(title);

        const year = document.createElement("p");
        year.textContent = this.books[i].year;
        my_book.appendChild(year);

        bookSection.appendChild(my_book);
        this.books[i].shown = true;

        my_book.addEventListener("click", () => {
          if (!Library.beenRead(i)) {
            my_book.style.backgroundColor = "purple";
          } else {
            my_book.style.backgroundColor = "#76abae";
          }
          Library.toggleRead(i);
        });
      }
    }
  }

  static toggleRead(id) {
    if (this.books[id].read) {
      this.books[id].read = false;
    } else {
      this.books[id].read = true;
    }
  }

  static beenRead(id) {
    if (this.books[id].read) {
      return true;
    } else {
      return false;
    }
  }
}

class Book {
  constructor(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.read = false;
    this.shown = false;
  }
}

const addButton = document.querySelector(".addButton");
const showButton = document.querySelector(".showButton");
const bookSection = document.querySelector(".bookSection");

addButton.addEventListener("click", () => {
  const bookInput = document.querySelector("#bookInput").value;

  if (bookInput != "") {
    const bookInfo = bookInput.split(", ");
    const title = bookInfo[0];
    const author = bookInfo[1];
    const year = Number(bookInfo[2]);
    const myBook = new Book(title, author, year);

    Library.addBookToLibrary(myBook);
  }
  document.querySelector("#bookInput").value = "";
});

showButton.addEventListener("click", () => {
  Library.printBooks();
});
