async function fetchProductData() {
    // Make a fetch request
    const response = await fetch("data/products.json");

    // ✅ Check if response is successful
    if (!response.ok) {
        console.log(`Network response was not ok - Status: ${response.status}`);
        return;
    }

    // Parse JSON
    const data = await response.json();

    console.log(data);

    // Display products
    displayProducts(data);
}

// Call the function
fetchProductData();


// Function to handle the DOM output
function displayProducts(productsArray) {
    const container = document.getElementById("products-container");
    let htmlOutput = "";

    // Loop through each product in the array
    productsArray.forEach(product => {
        /* Build the HTML string using the compound assignment operator 
        and template literals.
        Line breaks added for readability */
        htmlOutput += `
            <p>
            <b>${product.name}</b>
            Price: $${product.price}  
            Available?: ${product.inStock ? "Yes" : "No"}
            </p>
        `;
    });

    /* Output the final HTML to the "products-container"
    DIV element on the web page */
    container.innerHTML = htmlOutput;
}