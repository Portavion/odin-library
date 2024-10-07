const myLibrary = [];

function displayLibrary(library){
    for (book in library){
        createCard(library[book]);
    }
}

function createCard(book){
    libraryDiv = document.getElementById('library-container');
    // creates the card container for the book
    const cardDiv = document.createElement("div");
    cardDiv.classList.add('card-container');
    let index=999;

    for(n in myLibrary){
        if (book.title === myLibrary[n].title){
            index = n;
        }
    }
    cardDiv.setAttribute('id', index)

    //divs for displaying informations
    const titleDiv = document.createElement("div");
    titleDiv.appendChild(document.createTextNode(book.title));

    const authorDiv = document.createElement("div");
    authorDiv.appendChild(document.createTextNode(book.author));

    const pageDiv = document.createElement("div");
    pageDiv.appendChild(document.createTextNode(book.pages));


    const delButton = document.createElement('button');
    delButton.textContent = 'Remove';

    const toggleReadBtn = document.createElement('button');
    toggleReadBtn.textContent = 'Read';

    delButton.addEventListener('click', removeCard);
    toggleReadBtn.addEventListener('click', book.toggleRead);

    const readDiv = document.createElement("div");
    readDiv.classList.add('readingStatus')
    if (Number(book.read) === 1) {
        readDiv.appendChild(document.createTextNode("Read"));
    } 
    else {
        readDiv.appendChild(document.createTextNode("Not Read"));
    }

    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(authorDiv);
    cardDiv.appendChild(pageDiv);
    cardDiv.appendChild(readDiv);
    cardDiv.appendChild(delButton);
    cardDiv.appendChild(toggleReadBtn);

    libraryDiv.appendChild(cardDiv);
}

function submitForm(event){
    event.preventDefault();
    document.querySelector('dialog').close();

    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const pages = document.getElementById('bookPages').value;
    const read = document.querySelector('input[name="Read"]:checked').value;

    newBook = new Book(title, author, pages, read); 
    myLibrary.push(newBook);
    createCard(newBook);
    
}

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        let readString = '';
        if(read === 0){
            readString = 'not read yet';
        }
        else if(read === 1){
            readString = 'already read';
        }
        return (title + ' by ' + author + ', ' + pages + ' pages, ' + 
            readString + '.'
        );
    };

    this.toggleRead = function(event) {
        cardContainer = event.target.parentNode;
        readingStatus = cardContainer.querySelector('.readingStatus').textContent;
        if (readingStatus === 'Read'){
            cardContainer.querySelector('.readingStatus').innerText = 'Not Read';
        }
        else if (readingStatus === 'Not Read'){
            cardContainer.querySelector('.readingStatus').innerText = 'Read';
        }
    };
}


function removeCard(event) {
    event.target.parentNode.remove();
}

const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 0);
const harryPotter = new Book('Harry Potter 1', 'J.K Rowling', 455, 1);

myLibrary.push(theHobbit, harryPotter);

displayLibrary(myLibrary);

document.getElementById('newBook').addEventListener('click', () => {
    document.querySelector('#bookTitle').value = '';
    document.querySelector('#bookAuthor').value = '';
    document.querySelector('#bookPages').value = '';

    document.querySelector('dialog').showModal();
});

document.getElementById('closeDialog').addEventListener('click', () => {
    document.querySelector('dialog').close();
});

document.getElementById('submit-button').addEventListener('click', submitForm);

