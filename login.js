// Initialize Google API and handle sign-in
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var userEmail = profile.getEmail();

    // Log the user's email
    console.log('User signed in with Google:', userEmail);

    // Redirect to the homepage after successful login
    window.location.href = "index.html"; // Adjust this to your desired redirect URL
}

// Handle manual form submission for username/password login
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Dummy validation (this should be replaced with real server-side validation)
    if (username === "user" && password === "password") {
        alert("Login successful");
        window.location.href = "index.html"; // Redirect after successful login
    } else {
        alert("Invalid username or password");
    }
});
