$(document).ready(function () {

    /*Create New Employee Start */

    $('#btnSubmit').click(function (e) {
        e.preventDefault();
        debugger;

        // Gather form data
        var form = $(this).closest('form')[0];
        var formData = new FormData(form);
        var data = {};
        formData.forEach(function (value, key) {
            debugger;
            if (key === "EmpStatus") {
                // data[key] = form.EmpStatus.checked;
                data[key] = $('input[name="EmpStatus"]').is(':checked');
            } else {
                data[key] = value;
            }
        });

        // Get anti-forgery token
        var token = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: '/Employee/Create', // Use your AJAX endpoint
            type: 'POST',
            contentType: 'application/json',
            headers: { 'RequestVerificationToken': token },
            data: JSON.stringify(data),
            success: function (result) {
                debugger;
                if (result.success == true) {
                    Swal.fire({
                        title: 'Saved',
                        type: 'success',
                        icon: 'success',
                        text: result.message,
                        button: 'Close'
                    }).then(function () {
                        //window.location.href = '/Employee/Index';
                        window.location.href = result.redirectTo;
                    });
                } else {
                    Swal.fire('Error', 'Failed to create employee.', 'error');
                }
            },
            error: function () {
                Swal.fire('Error', 'Failed to create employee. Please check your input.', 'error');
            }
        });
    });

    /*Create New Employee End */

    /*Edit Employee Start */

    $('#btnUpdate').click(function (e) {
        e.preventDefault();
        debugger;

        // var updatedEmployeeData = {
        //     EmpId: $('#EmpId').val(),
        //     EmpFirstName: $('#EmpFirstName').val(),
        //     EmpLastName: $('#EmpLastName').val(),
        //     EmailId: $('#EmailId').val(),
        //     BirthDate:$('#BirthDate').val(),
        //     EmpPhoneNumber: $('#EmpPhoneNumber').val(),
        //     Salary: $('#Salary').val(),
        //     EmpStatus: $('input[name="EmpStatus"]').is(':checked'),
        //     DeptId:$('#DeptId').val()
        // };

        // Gather form data
        var form = $(this).closest('form')[0];
        var formData = new FormData(form);
        var data = {};
        formData.forEach(function (value, key) {
            debugger;
            if (key === "EmpStatus") {
                // data[key] = form.EmpStatus.checked;
                data[key] = $('input[name="EmpStatus"]').is(':checked');
            } else {
                data[key] = value;
            }
        });
        debugger;
        // Get anti-forgery token
        var token = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            //url: '/Employee/Edit', // Use your AJAX endpoint
            url: '@Url.Action("DeleteConfirm", "Employee")',
            type: 'POST',
            contentType: 'application/json',
            headers: { 'RequestVerificationToken': token },
            data: JSON.stringify(data),
            success: function (result) {
                debugger;
                if (result.success) {
                    Swal.fire({
                        title: 'Updated',
                        type: 'success',
                        icon: 'success',
                        text: result.message,
                        button: 'Close'
                    }).then(function () {
                        window.location.href = result.redirectTo;
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops..',
                        text: 'Failed to Update employee. Please check your input.'
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops..',
                    text: 'Failed to Update employee. Please check your input.'
                });
            }
        });
    });

    /*Edit Employee End */


    /* Delete Employee Start */
    $('#btnDelete').click(function (e) {
        e.preventDefault();

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this employee?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                //this.submit(); // Submit the form if confirmed
                debugger;
                var employeeId = $('#EmpId').val();
                // Get anti-forgery token
                var token = $('input[name="__RequestVerificationToken"]').val();
                $.ajax({
                    //url: '/Employee/DeleteConfirm', // Use your AJAX endpoint
                    url: '@Url.Action("DeleteConfirm", "Employee")', // Use your AJAX endpoint
                    type: 'POST',
                    headers: { 'RequestVerificationToken': token },
                    data: { empId: employeeId },
                    success: function (result) {
                        debugger;
                        if (result.success == "True") {
                            Swal.fire({
                                title: 'Deleted',
                                type: 'success',
                                icon: 'success',
                                text: result.message,
                                button: 'Close'
                            }).then(function () {
                                window.location.href = result.redirectTo;
                            });
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops..',
                                text: 'Failed to Update employee. Please check your input.'
                            });
                        }
                    },
                    error: function () {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops..',
                            text: 'Failed to Update employee. Please check your input.'
                        });
                    }
                });
            }
        });
    });

    /*Delete Employee End */
});
