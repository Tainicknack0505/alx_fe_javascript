
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

// Loading quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes){
        quotes = JSON.parse(storedQuotes);
    }
  }
  
// Saving quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Exporting quotes to JSON file
function exportToJsonFile() {
    const jsonQuotes = JSON.stringify(quotes);
    const blob = new Blob([jsonQuotes], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
}

// Importing quotes from JSON file
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes.push(...importedQuotes)
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to populate categories dynamically
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const uniqueCategories = [...new Set(quotes.map(quote => quote.category))];
    uniqueCategories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.text = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    let filteredQuotes = quotes;

    if (selectedCategory !== 'all') {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }

    quoteDisplay.innerHTML = '';
    filteredQuotes.forEach(quote => {
        const quoteElement = document.createElement('p');
        quoteElement.textContent = `${quote.text} - ${quote.category}`;
        quoteDisplay.appendChild(quoteElement);
    });

    // Saving the last selected filter to local storage
    localStorage.setItem('lastFilter', selectedCategory);
}

// Loading the last selected filter from local storage
function loadLastFilter() {
    const lastFilter = localStorage.getItem('lastFilter');
    if (lastFilter) {
        document.getElementById('categoryFilter').value = lastFilter;
        filterQuotes();
    }
}

// from here 
// Simulate server interaction using JSONPlaceholder API
const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

// Function to fetch data from server
async function fetchQuotesFromServer() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data from server:', error);
    }
}

// Function to post data to server
async function postQuotesToServer(data) {
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error posting data to server:', error);
    }
}

// Function to sync local data with server
async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
    const localQuotes = quotes;
  
    // Check for new quotes from server
    const newQuotes = serverQuotes.filter(quote => !localQuotes.find(localQuote => localQuote.id === quote.id));
    quotes = [...localQuotes, ...newQuotes];
  
    // Check for conflicts
    const conflicts = serverQuotes.filter(quote => localQuotes.find(localQuote => localQuote.id === quote.id && localQuote.text !== quote.text));
    conflicts.forEach(conflict => {
      const localQuote = localQuotes.find(quote => quote.id === conflict.id);
      if (localQuote) {
        // Resolve conflict by taking server's data
        localQuote.text = conflict.text;
      }
    });
  
    // Save updated local data to storage
    localStorage.setItem('quotes', JSON.stringify(quotes));
  
    // Notify user of updates or conflicts
    notifyUserOfUpdates(conflicts);
  }
  
  // Function to notify user of updates or conflicts
  function notifyUserOfUpdates(conflicts) {
    const notificationElement = document.getElementById('notification');
    if (conflicts.length > 0) {
      notificationElement.textContent = `Conflicts resolved: ${conflicts.length} quotes updated`;
    } else {
      notificationElement.textContent = 'Data synced successfully!';
    }
  }
  
  // Periodically sync data with server
  setInterval(syncQuotes, 10000); // sync every 10 seconds
  
  // Initialize local data from storage
  loadQuotes();
  
  // Add event listener for manual conflict resolution
  document.getElementById('resolveConflictsButton').addEventListener('click', () => {
    // Implement manual conflict resolution logic here
    console.log('Manual conflict resolution not implemented yet');
  });

// to here


// Initialize local data from storage
loadQuotes();
  
// Add event listener for manual conflict resolution
document.getElementById('resolveConflictsButton').addEventListener('click', () => {
    // Implement manual conflict resolution logic here
    console.log('Manual conflict resolution not implemented yet');
  });

// Event listener for displaying a random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for adding a new quote
document.getElementById('addQuoteButton').addEventListener('click', addQuote);

// Event listener for exporting JSON file
document.getElementById('exportButton').addEventListener('click', exportToJsonFile);

// Event listener for importing JSON file
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// Event listener to handle the import button 
document.getElementById('importButton').addEventListener('click', function() {
    document.getElementById('importFile').click();
  });

// Event listener for filtering quote
document.getElementById('categoryFilter').addEventListener('change', filterQuotes);


// Create the add quote form
createAddQuoteForm();

// Initial quote display
showRandomQuote();

// Load quotes
loadQuotes();

// Populating quote
populateCategories();

