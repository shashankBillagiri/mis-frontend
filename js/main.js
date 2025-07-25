$(document).ready(function() {
    $('#header').load('components/header.html');
    $('#buttons').load('components/buttons.html', function() {
        $('#employeeLogin').on('click', function() {
            window.location.href = 'components/employee-login.html'; 
        });
    });
    $('#footer').load('components/footer.html');
});
