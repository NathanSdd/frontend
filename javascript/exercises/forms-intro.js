// Get the form from the HTML using its unique ID
const formStudentReg = document.getElementById("myBigForm");

function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function validatePassword(password) {
    return password.length >= 8;
}

// Handle the submit event of the form
formStudentReg.addEventListener("submit", e => {   
    
    // Prevent data from being sent to a server and page from reloading
    e.preventDefault(); 
    
    // Get the input values after 'cleaning' them 
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    
    // Set up Boolean for simple validation
    let isValid = true;
    
    // Test input values and show/hide error messages
    if (firstName === "") {
        document.getElementById("firstNameError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("firstNameError").style.display = "none";
    }
    
    if (lastName === "") {
        document.getElementById("lastNameError").style.display = "block";
        isValid = false;
    } else {
        document.getElementById("lastNameError").style.display = "none";
    }

    if (!validateEmail(email)) {
    document.getElementById("emailError").style.display = "block";
    isValid = false;
} else {
    document.getElementById("emailError").style.display = "none";
}

// Validate password meets minimum requirements
if (!validatePassword(document.getElementById("password").value.trim())) {
    document.getElementById("passwordError").style.display = "block";
    isValid = false;
} else {
    document.getElementById("passwordError").style.display = "none";
}



const studentId = document.getElementById("studentId").value.trim();    
if (studentId < 10000 || studentId > 99999) {
    document.getElementById("studentIdError").style.display = "block";
    isValid = false;
} else {
    document.getElementById("studentIdError").style.display = "none";
}
    
    // If valid, process the data
    if (isValid) {
        console.log(`Welcome, ${firstName} ${lastName}!`);
        formStudentReg.reset(); // Clears all fields
    }

});


/* BLUR: Listener to check email format after user clicks away */

document.getElementById("email").addEventListener("blur", () => {
    if (!validateEmail(document.getElementById("email").value.trim())) {
        document.getElementById("emailError").style.display = "block";
    } else {
        document.getElementById("emailError").style.display = "none";
    }
});


// INPUT: Checks user's input on every keystroke and provides instant feedback
document.getElementById("studentId").addEventListener("input", () => {
    const studentId = document.getElementById("studentId").value.trim();
    if (studentId < 10000 || studentId > 99999) {
        document.getElementById("studentIdError").style.display = "block";
    } else {
        document.getElementById("studentIdError").style.display = "none";
    }
});


// Listen for keystrokes anywhere on the page
document.addEventListener("keydown", e => {
    // Check which key was pressed and if Ctrl/Cmd is held
    if (e.key === "Escape") {
        // Clear all forms on Escape
        document.querySelectorAll("form").forEach(form => form.reset());
        console.log("All fields cleared via Escape key.");
    }
    
    // Ctrl+Enter to submit (useful for long forms)
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        const activeForm = document.querySelector("form:focus-within");
        if (activeForm) {
            activeForm.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        }
    }
});