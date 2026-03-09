async function fetchBooks() {
    try {
        // Fetch request
        const response = await fetch("data/books.json");

        // ✅ First level: check response status
        if (!response.ok) {
            console.log(`Network response was not ok - Status: ${response.status}`);
            return;
        }

        // Parse JSON
        const data = await response.json();

        console.log(data);

        displayBooks(data);

    } catch (error) {
        // ✅ Second level: catch network/other errors
        console.error("Fetch error:", error);
    }
}

// Call function
fetchBooks();


// Display function
function displayBooks(booksArray) {
    const container = document.getElementById("books-output");
    let htmlOutput = "";

    booksArray.forEach(book => {
        htmlOutput += `
            <p>
            <b>${book.title}</b><br>
            Author: ${book.author}<br>
            Year: ${book.year}<br>
            Read?: ${book.isRead ? "Yes" : "No"}
            </p>
        `;
    });

    container.innerHTML = htmlOutput;
}