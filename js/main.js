$(document).ready(function() {
    // Load header, buttons, and footer components
    $('#header').load('components/header.html');
    $('#buttons').load('components/buttons.html', function() {
        // Attach event handlers after buttons are loaded
        $('#employeeLogin').on('click', function() {
            window.location.href = 'components/employee-login.html'; 
        });
    });
    $('#footer').load('components/footer.html');
});
