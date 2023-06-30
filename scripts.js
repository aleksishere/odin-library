let myLibrary = ['Stephen King,The Shining,700,Read',
                'George Orwell,1984,255,Read'
            ];

let bookList = document.getElementById('book-list');

displayLibrary();

function book(author, title, pages, read, notes) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;

    this.addBook = function() {
        let details = this.author.value + ',' + this.title.value + ',' + this.pages.value +',' + this.read.value;
        myLibrary.push(details);
        displayLibrary();
    }
}

function addBookToLibrary() {
    event.preventDefault();
    let author = document.getElementById('author');
    let title = document.getElementById('title');
    let pages = document.getElementById('pages');
    let read = document.getElementById('read');
    if (read.checked == false) {
        read.value = "Unread";
    } else {
        read.value = "Read";
    }

    if(author.value == '' || title.value == '' || pages.value == '' || read.value == '') {
        return false;
    } else {
        let book1 = new book(author, title, pages, read);
        book1.addBook();
    }
}

function displayLibrary() {
    bookList.textContent ='';
    for (let index = 0; index < myLibrary.length; index++) {
        let string = String(myLibrary[index]).split(',');
        let box = document.createElement('div');
        let title = document.createElement('p');
        let author = document.createElement('p');
        let pages = document.createElement('p');
        let read = document.createElement('p');
        let btnsWrapper = document.createElement('div');
        let deleteButton = document.createElement('button');
        let readButton = document.createElement('button');
        box.classList.add('book-item');
        box.id ='book' + index;

        title.textContent = string[1];
        author.textContent = string[0];
        pages.textContent = string[2] + ' pages';
        read.textContent = string[3];
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

function deleteBook() {
    let idDiv = this.parentNode.parentNode.id;
    let deletedDiv = document.getElementById(idDiv);
    deletedDiv.remove();
    myLibrary.splice(idDiv.replace(/^\D+/g, ''),1);
}

function changeReadStatus() {
    let number = this.parentNode.parentNode.id.replace(/^\D+/g, '');
    let arrayValues = myLibrary[number].split(',');
    if (arrayValues[3] == 'Read') {
        arrayValues[3] = 'Unread';
        myLibrary[number] = arrayValues.join(",");
        displayLibrary();
    } else if (arrayValues[3] == 'Unread') {
        arrayValues[3] = 'Read';
        myLibrary[number] = arrayValues.join(",");
        displayLibrary();
    }
}

