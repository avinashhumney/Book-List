// Book Constructor

function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() { };

// Add Book To List
UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <th>${book.title}</th>
    <th>${book.author}</th>
    <th>${book.isbn}</th>
    <th><a href="#" class="delete">X</a></th>
    `
    list.appendChild(row);
}

// Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Show Alert
UI.prototype.showAlert = function (message, className) {
    // Add div
    const div = document.createElement('div')
    // Add class names
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // grab container
    const container = document.querySelector('.container');
    // grab form group
    const form = document.querySelector('#book-form');
    // Insert alert
    container.insertBefore(div, form);
    // Timeout after 2sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

};

// Delete a book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

// Event Listener for adding a book
document.getElementById('book-form').addEventListener('submit', function (e) {

    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const isbn = document.getElementById('isbn').value

    const book = new Book(title, author, isbn);

    const ui = new UI();

    // Validate

    if (title === '' || author === '' || isbn === '') {
        ui.showAlert('Please fill in all fields', 'error');
    } else {

        ui.addBookToList(book);

        ui.clearFields();

        ui.showAlert('Book added successfully', 'success');
    }


    e.preventDefault;
});

// Event listener for deleting a book

document.getElementById('book-list').addEventListener('click', function(e){
    
    const ui = new UI();

    ui.deleteBook(e.target);

    // show alert
    ui.showAlert('Book removed successfully', 'success');

    e.preventDefault();
})