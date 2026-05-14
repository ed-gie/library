"use strict"

const tbody = document.querySelector("tbody");

//New Book
const newBookDialog = document.querySelector("#new-book");
const newBookBtn = document.querySelector(".new-book-btn");
const closeBtn = newBookDialog.querySelector(".close-btn");
const submitBtn = newBookDialog.querySelector(".submit-btn");

newBookBtn.addEventListener("click", () => {
    newBookForm.reset();
    newBookDialog.showModal();
})

// Form Inputs
const newBookForm = document.querySelector("#new-book form")
const formTitle = newBookDialog.querySelector("#title");
const formAuthor = newBookDialog.querySelector("#author");
const formPages = newBookDialog.querySelector("#pages");
const formStatus = newBookDialog.querySelector("#status");

closeBtn.addEventListener("click", () => {
    newBookDialog.close();
})

submitBtn.addEventListener("click", () => {
    addBookToLibrary(formTitle.value, formAuthor.value, formPages.value, formStatus.value === "yes");
    displayLibrary();
    newBookDialog.close();
})

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
    tbody.innerHTML = "";
    for (let i = 0; i < myLibrary.length; i++) {
        const newBook = document.createElement("tr");
        newBook.className = "book";
        newBook.dataset.uniqueId = myLibrary[i].id;

        const newTitle = document.createElement("td");
        newTitle.className = "title";
        newTitle.textContent = myLibrary[i].title;
        newBook.appendChild(newTitle);

        const newAuthor = document.createElement("td");
        newAuthor.className = "author";
        newAuthor.textContent = myLibrary[i].author;
        newBook.appendChild(newAuthor);

        const newPages = document.createElement("td");
        newPages.className = "pages";
        newPages.textContent = myLibrary[i].pages;
        newBook.appendChild(newPages);

        const newId = document.createElement("td");
        newId.className = "id";
        newId.textContent = myLibrary[i].id;
        newBook.appendChild(newId);

        const newHasRead = document.createElement("td");
        newHasRead.className = "read-status";
        const hasReadBtn = document.createElement("button");
        hasReadBtn.className = myLibrary[i].hasRead ? "read" : "unread";
        hasReadBtn.textContent = myLibrary[i].hasRead ? "Read" : "Unread";
        newHasRead.appendChild(hasReadBtn);
        newBook.appendChild(newHasRead);
        //Status Toggle
        hasReadBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(obj => obj.id === newBook.dataset.uniqueId);
            myLibrary[index].toggleRead();
            displayLibrary();
        })

        const removeBook = document.createElement("td");
        const removeBookBtn = document.createElement("button");
        removeBookBtn.textContent = "REMOVE";
        removeBookBtn.className = "remove-book-btn";
        removeBookBtn.dataset.uniqueId = myLibrary[i].id;
        removeBook.appendChild(removeBookBtn);
        newBook.appendChild(removeBook);
        //Remove Book
        removeBookBtn.addEventListener("click", () => {
            const index = myLibrary.findIndex(obj => obj.id === removeBookBtn.dataset.uniqueId);
            myLibrary.splice(index, 1);
            displayLibrary();
        })

        tbody.appendChild(newBook);
    }

}

Book.prototype.toggleRead = function() {
    this.hasRead = !this.hasRead;
}

displayLibrary();