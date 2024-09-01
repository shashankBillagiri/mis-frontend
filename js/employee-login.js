document.getElementById('employeeLoginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const employeeId = document.getElementById('employeeId').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    // Simple validation
    if (employeeId === '' || password === '') {
        alert('Please enter both Employee ID and Password.');
        return;
    }

    // Here you would normally send the data to a server
    // For demo purposes, we’ll just log it
    console.log('Employee ID:', employeeId);
    console.log('Password:', password);
    console.log('Remember Me:', rememberMe);

    // Simulate login success
    alert('Login successful!');

    // If rememberMe is checked, you might store credentials in localStorage (not recommended for production)
    if (rememberMe) {
        localStorage.setItem('employeeId', employeeId);
        localStorage.setItem('password', password); // Note: Storing plain passwords is not secure
    }

    // Redirect to another page if needed
    // window.location.href = 'dashboard.html';
});
