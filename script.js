
const myLibrary = [];

const modal = document.querySelector("#modal");
const openModal = document.querySelector("#add-book");
const closeModal = document.querySelector("#close-button");

const bookForm = document.querySelector("#book-form");

const bookshelf = document.querySelector("#bookshelf");

function Book(author, title, numPages, read = false){
    this.id = crypto.randomUUID();
    this.author = author;
    this.title = title;
    this.numPages = numPages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function(){
    this.read = !this.read;
}

function addBookToLibrary(author, title, numPages, read){
    const book = new Book(author, title, numPages, read);

    myLibrary.push(book);

    bookshelf.innerHTML = "";
    populateGrid();
}
function populateGrid(){
    bookshelf.innerHTML = "";

    myLibrary.forEach((book, index) =>{
        const newDiv = document.createElement('div');
        newDiv.classList.add('book');

        const titleP = document.createElement('p');
        titleP.textContent = book.title;
        const authorP = document.createElement('p');
        authorP.textContent = book.author;
        const pagesP = document.createElement('p');
        pagesP.textContent = book.numPages;
        const buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('bookButtons');

        const readBtn = document.createElement('button');
        readBtn.classList.add('bookRead');
        readBtn.classList.add(book.read ? 'readBook' : 'unreadBook');
        readBtn.dataset.id = book.id;
        readBtn.textContent = book.read ? "Read" : "Unread";

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('removeBook');
        removeBtn.dataset.id = book.id;
        removeBtn.textContent = "Remove";

        buttonsDiv.appendChild(readBtn);
        buttonsDiv.appendChild(removeBtn);

        newDiv.appendChild(titleP);
        newDiv.appendChild(authorP);
        newDiv.appendChild(pagesP);
        newDiv.appendChild(buttonsDiv);

        newDiv.querySelector(".bookRead").addEventListener('click', (e)=>{
            const id = e.target.dataset.id;
            const book = myLibrary.find(b => b.id === id);
            book.toggleReadStatus();

            const item = e.target;

            item.className = `bookRead ${book.read ? 'readBook': 'unreadBook'}`
            item.textContent = book.read ? 'Read' : 'Unread';
        })
        newDiv.querySelector(".removeBook").addEventListener('click', (e)=>{
            const id = e.target.dataset.id;
            const index = myLibrary.findIndex(b => b.id === id);
            myLibrary.splice(index, 1);
            populateGrid();
        })
        bookshelf.append(newDiv);
    })
}

populateGrid();

openModal.addEventListener('click', () =>{
    modal.showModal();
})
closeModal.addEventListener('click', ()=>{
    modal.close();
})
bookForm.addEventListener('submit', e =>{
    e.preventDefault();

    const data = e.target;

    const author = data.querySelector("#author").value;
    const title = data.querySelector("#title").value;
    const pages = data.querySelector("#pages").value;
    const read = data.querySelector("#read").checked;

    addBookToLibrary(author, title, pages, read);

    data.reset();
})
/*
Checklist:
---
*function that loops through array, displays each book on page
 -a card for each one
*NEW BOOK button, brings up new form that:
 -add author
 -add title
 -add num pages
 -read status
 -etc. anything else you might want
*you can use dialogs/modals to do this
*add button on each book card to remove it from library
 -maybe use data attribute to track index array
*add button to change read status
*/