// Declare three const variables that hold references to the input, button, and .list elements
const input = document.getElementById('favchap');
const button = document.querySelector('button');
const list = document.getElementById('list');

// Create a click event listener for the Add Chapter button
button.addEventListener('click', () => {
  // Check to make sure the input is not blank
  if (input.value.trim() !== '') {
    // Create a li element
    const li = document.createElement('li');
    
    // Create a delete button
    const deleteButton = document.createElement('button');
    
    // Populate the li element's textContent with the input value
    li.textContent = input.value;
    
    // Populate the button's textContent with a ❌
    deleteButton.textContent = '❌';
    
    // Append the delete button to the li element
    li.appendChild(deleteButton);
    
    // Append the li element to the unordered list in your HTML
    list.appendChild(li);
    
    // Add an event listener to the delete button that removes the li element when clicked
    deleteButton.addEventListener('click', () => {
      list.removeChild(li);
    });
    
    // Send the focus to the input element
    input.focus();
    
    // Change the input value to nothing or the empty string to clean up the interface for the user
    input.value = '';
  } else {
    // If the input is blank, return the focus to the input field
    input.focus();
  }
});
