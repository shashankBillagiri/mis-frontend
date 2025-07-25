
import config from '../js/config/config.js';

document.getElementById('employeeLoginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const employeeId = document.getElementById('employeeId').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    
    if (employeeId === '' || password === '') {
        alert('Please enter both Employee ID and Password.');
        return;
    }

    
    const hardcodedEmployeeId = 'admin';
    const hardcodedPassword = 'password123';

   
    if (employeeId === hardcodedEmployeeId && password === hardcodedPassword) {
        alert('Login successful!');

        // Store credentials in localStorage if rememberMe is checked
        if (rememberMe) {
            localStorage.setItem('employeeId', employeeId);
            localStorage.setItem('password', password); 
        }

        
        $.ajax({
            url: `${config.GET_ALL_STUDENTS}?pageNumber=0&pageSize=0`,
            method: 'GET',
            success: function(response) {
                console.log('API Response:', response); 
                
                
                if (response.studentDetails && Array.isArray(response.studentDetails)) {
                    const students = response.studentDetails;
                    const tableBody = $('#studentTable tbody');
                    
                    // Clear any existing rows
                    tableBody.empty();

                    
                    students.forEach(student => {
                        const row = `
                            <tr>
                                <td><input type="checkbox" class="student-checkbox" data-student-id="${student.studentId}"></td>
                                <td>${student.id}</td>
                                <td>${student.firstName}</td>
                                <td>${student.lastName}</td>
                                <td>${student.gender}</td>
                                <td>${student.email}</td>
                                <td>${student.contactNumber}</td>
                                <td>${student.addressLine1}, ${student.addressLine2}, ${student.addressLine3}</td>
                                <td>${student.state}</td>
                                <td>${student.zipcode}</td>
                                <td>${student.course}</td>
                                <td>${student.studentId}</td>
                                <td>${student.dateOfJoining}</td>
                                <td>${student.age}</td>
                            </tr>
                        `;
                        tableBody.append(row);
                    });

                    // Show the table container and the buttons, and hide the login form after data is loaded
                    $('.student-table-container').show();
                    $('.button-container').show(); 
                    $('.login-container').hide();
                } else {
                    console.error('Expected studentDetails to be an array but got:', response.studentDetails);
                }
            },
            error: function(xhr, status, error) {
                console.error('AJAX Error:', status, error);
                alert('Failed to fetch student details. Please try again.');
            }
        });

    } else {
        alert('Invalid Employee ID or Password.');
    }
});


$('#deleteButton').click(function() {
  
    const selectedIds = $('.student-checkbox:checked').map(function() {
        return $(this).data('student-id');
    }).get();

    if (selectedIds.length === 0) {
        alert('No students selected for deletion.');
        return;
    }

    // Construct the URL with the selected IDs
    const url = `${config.DELETE_STUDENTS}/${selectedIds.join(',')}`;

   
    $.ajax({
        url: url,
        method: 'DELETE',
        success: function(response) {
            alert(`Students with IDs ${selectedIds.join(', ')} are deleted.`);
            // Optionally, remove the deleted rows from the table
            $('.student-checkbox:checked').closest('tr').remove();
        },
        error: function(xhr, status, error) {
            console.error('DELETE Error:', status, error);
            alert('Failed to delete students. Please try again.');
        }
    });
});


$('#selectAll').change(function() {
    const isChecked = $(this).is(':checked');
    $('.student-checkbox').prop('checked', isChecked);
});


$('#addStudentButton').click(function() {
 
    const newStudent = {
        id: prompt("Enter ID:"),
        firstName: prompt("Enter First Name:"),
        lastName: prompt("Enter Last Name:"),
        gender: prompt("Enter Gender (M/F):"),
        age: prompt("Enter Age:"),
        email: prompt("Enter Email:"),
        contactNumber: prompt("Enter Contact Number:"),
        addressLine1: prompt("Enter Address Line 1:"),
        addressLine2: prompt("Enter Address Line 2:"),
        addressLine3: prompt("Enter Address Line 3:"),
        state: prompt("Enter State:"),
        zipCode: prompt("Enter Zipcode:"),
        course: prompt("Enter Course:")
    };

    
    $.ajax({
        url: config.ADD_STUDENTS,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify([newStudent]), 
        success: function(response) {
            alert('Student added successfully!');
            
        },
        error: function(xhr, status, error) {
            console.error('POST Error:', status, error);
            alert('Failed to add student. Please try again.');
        }
    });
});
