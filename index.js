"use strict"

const tbody = document.querySelector("tbody");

const myLibrary = [];

function Book(title, author, pages, id, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
    this.hasRead = hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
    const id = crypto.randomUUID();
    const book = new Book(title, author, pages, id, hasRead);
    myLibrary.push(book);
}

addBookToLibrary("1984", "George Orwell,", 328, true);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, false);
addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 432, false);
addBookToLibrary("Frankenstein", "Mary Shelley", 280, false);

function displayLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        const newBook = document.createElement("tr");
        newBook.className = "book";

        const newTitle = document.createElement("td");
        newTitle.className = "title";
        newTitle.textContent = `${myLibrary[i].title}`;
        newBook.appendChild(newTitle);

        const newAuthor = document.createElement("td");
        newAuthor.className = "author";
        newAuthor.textContent = `${myLibrary[i].author}`;
        newBook.appendChild(newAuthor);

        const newPages = document.createElement("td");
        newPages.className = "pages";
        newPages.textContent = `${myLibrary[i].pages}`;
        newBook.appendChild(newPages);

        const newId = document.createElement("td");
        newId.className = "id";
        newId.textContent = `${myLibrary[i].id}`;
        newBook.appendChild(newId);

        const newHasRead = document.createElement("td");
        newHasRead.className = "read";
        newHasRead.textContent = myLibrary[i].hasRead ? "Read" : "Unread";
        newBook.appendChild(newHasRead);

        tbody.appendChild(newBook);
    }

}
displayLibrary();