const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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
    }
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
