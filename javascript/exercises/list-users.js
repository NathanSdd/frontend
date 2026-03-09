async function fetchUserData() {
    const response = await fetch("data/users.json");

    // ✅ Check status
    if (!response.ok) {
        console.log(`Network response was not ok - Status: ${response.status}`);
        return;
    }

    const data = await response.json();

    console.log(data);

    displayUsers(data);
}

// Call the function
fetchUserData();


// Function to handle the DOM output
function displayUsers(usersArray) {
    const container = document.getElementById("users-container");
    let htmlOutput = "";

    usersArray.forEach(user => {
        htmlOutput += `
            <p>
            <b>${user.firstName} ${user.lastName}</b><br>
            Age: ${user.age}<br>
            Active?: ${user.isActive ? "Yes" : "No"}
            </p>
        `;
    });

    container.innerHTML = htmlOutput;
}
