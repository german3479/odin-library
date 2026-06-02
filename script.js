
const myLibrary = [];

const modal = document.querySelector("#modal");
const openModal = document.querySelector("#add-book");
const closeModal = document.querySelector("#close-button");

const bookForm = document.querySelector("#book-form");

const bookshelf = document.querySelector("#bookshelf");

const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');

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

function showError(input, message){
    const errorEl = document.getElementById(`${input.id}-error`);
    input.setCustomValidity(message);
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    input.style.borderColor = '#d32f2f';
}
function clearError(input){
    const errorEl = document.getElementById(`${input.id}-error`);
    input.setCustomValidity('');
    errorEl.style.display = 'none';
    input.style.borderColor = '#ccc';
}

function isValidText(input){
    return input.value.trim().length > 0;
}

titleInput.addEventListener('blur', () => {
    if (!titleInput.checkValidity() || !isValidText(titleInput)) {
        showError(titleInput, "The title must be filled!");
    } else {
        clearError(titleInput);
    }
});

authorInput.addEventListener('blur', () => {
    if (!authorInput.checkValidity() || !isValidText(authorInput)) {
        showError(authorInput, "The author must be filled!");
    } else {
        clearError(authorInput);
    }
});

pagesInput.addEventListener('blur', () => {
    if (!pagesInput.checkValidity()) {
        showError(pagesInput, "Please enter a valid number of pages!");
    } else {
        clearError(pagesInput);
    }
});

titleInput.addEventListener('focus', () => clearError(titleInput));
authorInput.addEventListener('focus', () => clearError(authorInput));
pagesInput.addEventListener('focus', () => clearError(pagesInput));

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
            if (!book) return;

            book.toggleReadStatus();

            const item = e.target;

            item.className = `bookRead ${book.read ? 'readBook': 'unreadBook'}`
            item.textContent = book.read ? 'Read' : 'Unread';
        })
        newDiv.querySelector(".removeBook").addEventListener('click', (e)=>{
            const id = e.target.dataset.id;
            const index = myLibrary.findIndex(b => b.id === id);
            if (index === -1) return;

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

    clearError(titleInput);
    clearError(authorInput);
    clearError(pagesInput);

    if (!titleInput.checkValidity() || !isValidText(titleInput)) {
        showError(titleInput, "The title must be filled!");
        titleInput.focus();
        return;
    }
    clearError(titleInput);

    if (!authorInput.checkValidity() || !isValidText(authorInput)) {
        showError(authorInput, "The author must be filled!");
        authorInput.focus();
        return;
    }
    clearError(authorInput);

    if (!pagesInput.checkValidity()) {
        showError(pagesInput, "Please enter a valid number of pages!");
        pagesInput.focus();
        return;
    }
    clearError(pagesInput);

    const author = authorInput.value;
    const title = titleInput.value;
    const pages = pagesInput.value;
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