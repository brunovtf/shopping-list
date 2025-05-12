const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const filterInput = document.querySelector('.filter');
const clearButton = document.getElementById('clear');
const filterInputBox = document.getElementById('filter');

// Load items from local storage on page load
window.addEventListener('DOMContentLoaded', () => {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach(item => {
        const newItemLi = document.createElement('li');
        newItemLi.textContent = item;

        const deleteButton = createButton('remove-item btn-link btn-danger text-red');
        newItemLi.appendChild(deleteButton);
         
        itemList.appendChild(newItemLi);
    });
    checkList();
})

// Event listener for form submission
itemForm.addEventListener('submit', addItem);

// Function to add an item to the list
function addItem(event) {
    event.preventDefault();
    const newItem = itemInput.value.trim();
    if (newItem !== '') {
        const newItemLi = document.createElement('li');
        newItemLi.textContent = newItem;

        const deleteButton = createButton('remove-item btn-link btn-danger text-red');
        newItemLi.appendChild(deleteButton);
         
        itemList.appendChild(newItemLi);
        itemInput.value = '';
        itemInput.focus();
        addToLocalStorage(newItem);
    }
    checkList();
}

// Add item to local storage
function addToLocalStorage(item) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

// Delete item from local storage
function deleteFromLocalStorage(item) {
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items = items.filter(i => i !== item);
    localStorage.setItem('items', JSON.stringify(items));
}

function createButton(className) {
    const button = document.createElement('button');
    button.className = className;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

function createIcon(className) {
    const icon = document.createElement('i');
    icon.className = className;
    return icon;
}

// Event delegation for delete buttons
function removeItem(event) {
    if (event.target.matches('.fa-solid')) {
        const itemToRemove = event.target.closest('li');
        if (confirm('Are you sure you want to delete this item?')) {
            itemList.removeChild(itemToRemove);
        }
        deleteFromLocalStorage(itemToRemove.textContent);
    }
    
    checkList();
}

// Event listener for delete buttons
itemList.addEventListener('click', removeItem);

// Clear the list when the clear button is clicked

clearButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear the list?')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
        localStorage.removeItem('items');
        checkList();
    }
});

// Check if there is list items to hide/show the clear button and filter items
function checkList() {
    if (itemList.children.length > 0) {
        clearButton.style.display = 'block';
        filterInput.style.display = 'block';
    } else {
        clearButton.style.display = 'none';
        filterInput.style.display = 'none';
    }
}

// Event listener for filter input
filterInputBox.addEventListener('input', filterItems);

// Function to filter items
function filterItems(event) {
    const text = event.target.value.toLowerCase();
    const items = itemList.getElementsByTagName('li');
    Array.from(items).forEach(item => {
        const itemName = item.textContent.toLowerCase();
        if (itemName.indexOf(text) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// check if there are items in the list on page load
checkList();
