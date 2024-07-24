
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
    const randomIndex = Math.floor(math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById('quoteDisplay').innerText = `${quote.text} - ${quote.category}`;
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        const newQuote = {
            text: newQuoteText,
            category: newQuoteCategory
        };
        quotes.push(newQuote);

        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        alert('Quote added successfully!');
    } else {
        alert('Please enter both a quote and a category.');
    }
}

// Event listener for displaying a random quote
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

