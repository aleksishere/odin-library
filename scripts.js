let myLibrary = [];
let bookList = document.getElementById('book-list');
document.getElementById('addBook').addEventListener("click", addBookToLibrary);

// Book class
class book {
    constructor(author, title, pages, read, id) {
        this.author = author;
        this.title = title;
        this.pages = pages;
        this.read = read;
        this.id = id;
    }

    addBook(book) {
        myLibrary.push(book);
        book.setID(book);
        displayLibrary();
    }
    setID(book) {
        for (let index = 0; index < myLibrary.length; index++) {
            book.id = index;
        }
    }
}

let book1 = new book("Stephen King","The Shining",666,"Read");
book1.addBook(book1);
displayLibrary();

function addBookToLibrary() {
    let author = document.getElementById('author').value;
    let title = document.getElementById('title').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementById('read').value;
    if (document.getElementById('read').checked == false) {read = "Unread";} else {read = "Read";}
    let books = new book(author, title, pages, read);
    if(author == '' || title == '' || pages == '') {
        return false;
    } else books.addBook(books);
}

// Function to create 'shelf' library

function displayLibrary() {
    bookList.textContent = '';
    for (let index = 0; index < myLibrary.length; index++) {
        let box = document.createElement('div');
        let title = document.createElement('p');
        let author = document.createElement('p');
        let pages = document.createElement('p');
        let read = document.createElement('p');
        let btnsWrapper = document.createElement('div');
        let deleteButton = document.createElement('button');
        let readButton = document.createElement('button');
        box.classList.add('book-item');
        box.id = index;

        title.textContent = myLibrary[index].title;
        author.textContent = myLibrary[index].author;
        pages.textContent = myLibrary[index].pages + ' pages';
        read.textContent = myLibrary[index].read;
        read.classList.add("readstatus");

        readButton.textContent = "Change read status";
        readButton.addEventListener('click', changeReadStatus);
        readButton.setAttribute("type", "button");

        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener("click", deleteBook);
        deleteButton.setAttribute("type", "button");

        bookList.appendChild(box);
        box.append(title,author,pages,read);
        box.appendChild(btnsWrapper);

        btnsWrapper.append(readButton);
        btnsWrapper.append(deleteButton);
    }
}

// Checks array for id and then deletes div and array object.
function deleteBook() {
    let idDiv = Number(this.parentNode.parentNode.id);
    let deletedDiv = document.getElementById(idDiv);
    deletedDiv.remove();
    myLibrary.splice(myLibrary.indexOf(myLibrary.find(item => item.id == idDiv)),1);
}

// Checks array for id and then changes read status.
function changeReadStatus() {
    let idDiv = this.parentNode.parentNode.id;
    if(myLibrary[myLibrary.indexOf(myLibrary.find(item => item.id == idDiv))].read == 'Read') {
        myLibrary[myLibrary.indexOf(myLibrary.find(item => item.id == idDiv))].read = 'Unread';
        displayLibrary()
    } else {
        myLibrary[myLibrary.indexOf(myLibrary.find(item => item.id == idDiv))].read = 'Read';
        displayLibrary()
    }
}

