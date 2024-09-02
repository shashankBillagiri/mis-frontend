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

    // Hardcoded login credentials for demonstration purposes
    const hardcodedEmployeeId = 'admin';
    const hardcodedPassword = 'password123';

    // Check credentials
    if (employeeId === hardcodedEmployeeId && password === hardcodedPassword) {
        alert('Login successful!');

        // Store credentials in localStorage if rememberMe is checked
        if (rememberMe) {
            localStorage.setItem('employeeId', employeeId);
            localStorage.setItem('password', password); // Note: Storing plain passwords is not secure
        }

        // Fetch student data from the API
        $.ajax({
            url: 'http://localhost:8191/v1/mis/getallstudentdetails?pageNumber=0&pageSize=0',
            method: 'GET',
            success: function(response) {
                console.log(response); // Log the response to check its format
                
                // Check if response contains studentDetails and if it is an array
                if (response.studentDetails && Array.isArray(response.studentDetails)) {
                    const students = response.studentDetails;
                    const tableBody = $('#studentTable tbody');
                    
                    // Clear any existing rows
                    tableBody.empty();

                    // Populate the table with student data
                    students.forEach(student => {
                        const row = `
                            <tr>
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

                    // Show the table after data is loaded
                    $('.student-table-container').show();
                } else {
                    console.error('Expected studentDetails to be an array but got:', response.studentDetails);
                }
            },
            error: function() {
                alert('Failed to fetch student details. Please try again.');
            }
        });

    } else {
        alert('Invalid Employee ID or Password.');
    }
});
