import { Auth } from 'aws-amplify';

// Handle Login
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const user = await Auth.signIn(username, password);
        document.getElementById('errorMessage').textContent = 'Login successful!';
        console.log('Logged in user:', user);
        // Redirect to home page or dashboard
    } catch (error) {
        document.getElementById('errorMessage').textContent = 'Login failed!';
        console.error('Error during login:', error);
    }
});

// Handle Signup
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    try {
        const { user } = await Auth.signUp({
            username,
            password,
        });
        document.getElementById('signupMessage').textContent = 'Signup successful! Please log in.';
        console.log('Signed up user:', user);
        // Store additional data in RDS if necessary
        saveUserToRDS(username);
    } catch (error) {
        document.getElementById('signupMessage').textContent = 'Signup failed!';
        console.error('Error during signup:', error);
    }
});

// Save user data to RDS
async function saveUserToRDS(username) {
    try {
        const response = await fetch('/api/saveUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }),
        });
        const data = await response.json();
        console.log('User saved to RDS:', data);
    } catch (error) {
        console.error('Error saving user to RDS:', error);
    }
}
