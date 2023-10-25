let mb = new Book(
    "Steven",
    "Tester's Grave",
    616,
    true
)
let mb2 = new Book(
    "Lincoln",
    "My Bullet, My Heart",
    666,
    false
)
const myLibrary = [mb, mb2];

const modal = document.querySelector("#modal");
const openModal = document.querySelector("#add-book");
const closeModal = document.querySelector("#close-button");

const bookForm = document.querySelector("#book-form");

const bookshelf = document.querySelector("#bookshelf");

function Book(author, title, numPages, read = false){
    return {
        author,
        title,
        numPages,
        read,
        toggleReadStatus(){
            this.read = !this.read;
        }
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);

    bookshelf.innerHTML = "";
    populateGrid();
}
function populateGrid(){
    bookshelf.innerHTML = "";

    myLibrary.forEach((book, index) =>{
        const newDiv = document.createElement('div');
        newDiv.classList.add('book');

        newDiv.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <p>${book.numPages}</p>
        <div class="bookButtons">
            <button class="bookRead ${book.read ? 'readBook' : 'unreadBook'}" data-index="${myLibrary.indexOf(book)}">${book.read ? "Read" : "Unread"}</button>
            <button class="removeBook" data-index="${myLibrary.indexOf(book)}">Remove</button>
        </div>
        `

        newDiv.querySelector(".bookRead").addEventListener('click', (e)=>{
            const index = e.target.dataset.index;
            myLibrary[index].toggleReadStatus();

            const item = e.target;

            item.className = `bookRead ${myLibrary[index].read ? 'readBook' : 'unreadBook'}`
            item.textContent = myLibrary[index].read ? 'Read' : 'Unread';
        })
        newDiv.querySelector(".removeBook").addEventListener('click', (e)=>{
            const index = e.target.dataset.index;
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

    const bookToAdd = new Book(author, title, pages, read);

    addBookToLibrary(bookToAdd);

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