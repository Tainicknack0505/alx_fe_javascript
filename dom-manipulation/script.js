
// Adding Array of quotes for storage
let quotes = [
    {
        text: "One can only be young once. - Tainicknacks", 
        category: "Motivation"
    },

    {
        text: "Life gets easier when we don't try hard to interfere with it. - Tainicknacks",
        category: "Life"
    },

    {
        text: "The mind makes us our heaven or hell - Tainicknacks",
        category: "Mindset"
    }
];

// Function to show a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `<p>${quotes[randomIndex].text}</p><p><em>Category: ${quotes[randomIndex].category}</em></p>`;
}

// Function to create the add quote form
function createAddQuoteForm() {
    const addQuoteForm = document.getElementById('addQuoteForm');

    const inputText = document.createElement('input');
    inputText.id = 'newQuoteText';
    inputText.type = 'text';
    inputText.placeholder = 'Enter a new quote';
    addQuoteForm.appendChild(inputText);

    const inputCategory = document.createElement('input');
    inputCategory.id = 'newQuoteCategory';
    inputCategory.type = 'text';
    inputCategory.placeholder = 'Enter quote category';
    addQuoteForm.appendChild(inputCategory);

    const button = document.createElement('button');
    button.onclick = addQuote;
    button.textContent = 'Add Quote';
    addQuoteForm.appendChild(button);
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        alert("Quote added successfully!");

        // Initial quote display
        showRandomQuote();
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
    } else {
      alert("Please enter both quote text and category.");
    }
  }
  
// Event listener for displaying a random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for adding a new quote
document.getElementById('addQuoteButton').addEventListener('click', addQuote);

// Create the add quote form
createAddQuoteForm();

// Initial quote display
showRandomQuote();
