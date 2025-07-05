$(document).ready(function () {

    //$('#EmpBirthDate').datepicker({
    //    format: 'yyyy-mm-dd',
    //    autoclose: true,
    //    todayHighlight: true,
    //    endDate: '0d'
    //});

    // Allow only a-z or A-Z in First Name field
    $('input[name="EmpFirstName"], input[name="EmpLastName"]').on('keypress', function (e) {
        var char = String.fromCharCode(e.which);
        //if (!/^[a-zA-Z ]$/.test(char)) {
        if (!/^[a-zA-Z]$/.test(char)) {
            e.preventDefault();
        }
    });

    // Email validation on focus out
    $('input[name="EmailId"]').on('blur', function () {
        var email = $(this).val();
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var $errorSpan = $('[data-valmsg-for="EmailId"]');
        $errorSpan.text(''); // Clear previous error

        if (email && !emailRegex.test(email)) {
            $errorSpan.text('Please enter a valid email address.');
        }
    });

    // Allow only digits and restrict to 10 characters for Phone Number
    $('input[name="EmpPhoneNumber"]').on('keypress', function (e) {
        var char = String.fromCharCode(e.which);
        // Prevent non-digit input
        if (!/[0-9]/.test(char)) {
            e.preventDefault();
            return;
        }
        // Prevent entering more than 10 digits
        if ($(this).val().length >= 10) {
            e.preventDefault();
        }
    });


    $('#btnSubmit').click(function (e) {
        e.preventDefault();

        var $empform = $(this).closest('form');
        debugger;

        // Trigger jQuery Unobtrusive Validation
        if (!$empform.valid()) {
            // If invalid, do not proceed with AJAX
            return;
        }

        // Gather form data
        var form = $(this).closest('form')[0];
        var formData = new FormData(form);
        var data = {};

        formData.forEach(function (value, key) {
            if (key === "EmpStatus") {
                data[key] = $('input[name="EmpStatus"]').is(':checked');
            } else if (key === "BirthDate") {
                // Ensure date is in yyyy-MM-dd format
                data[key] = value ? value : null;
            } else {
                data[key] = value;
            }
        });

        // Get anti-forgery token
        var token = $('input[name="__RequestVerificationToken"]').val();

        $.ajax({
            url: '/Employee/Create',
            type: 'POST',
            contentType: 'application/json',
            headers: { 'RequestVerificationToken': token },
            data: JSON.stringify(data),
            success: function (result) {               
                if (result.success) {
                    Swal.fire({
                        title: 'Saved',
                        icon: 'success',
                        text: result.message,
                        button: 'Close'
                    }).then(function () {
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

    /*Create New Employee Start */

    $('#btnSubmit1').click(function (e) {
        e.preventDefault();
        debugger;

        //var isValid = true;
        //// Clear previous highlights
        //$('.form-control').removeClass('is-invalid');

        //// Validate required fields
        //$('.form-control[required]').each(function () {
        //    if (!$(this).val()) {
        //        $(this).addClass('is-invalid');
        //        isValid = false;
        //    }
        //});

        //if (!isValid) {
        //    // Optionally show a message
        //    $('#validationSummary').text('Please fill all required fields.').show();
        //    return;
        //}


        // Clear previous error messages
        $('span.text-danger').text('');

        var isValid = true;
        $('.form-control[required], select[required]').each(function () {
            if (!$(this).val()) {
                isValid = false;
                var fieldName = $(this).attr('name');
                $('[data-valmsg-for="' + fieldName + '"]').text('This field is required.');
            }
        });

        if (!isValid) {
            return;
        }

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


        var $empform = $(this).closest('form');
        debugger;
        // Trigger jQuery Unobtrusive Validation
        if (!$empform.valid()) {
            // If invalid, do not proceed with AJAX
            return;
        }

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
            url: '@Url.Action("Edit", "Employee")',
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
                    url: '/Employee/DeleteConfirm', // Use your AJAX endpoint
                    //url: '@Url.Action("DeleteConfirm", "Employee")', // Use your AJAX endpoint
                    type: 'POST',
                    headers: { 'RequestVerificationToken': token },
                    data: { empId: employeeId },
                    success: function (result) {
                        debugger;
                        if (result.success == true) {
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
                            debugger;
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops..',
                                text: 'Failed to Delete employee. Please check your input.'
                            });
                        }
                    },
                    error: function () {
                        debugger;
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops..',
                            text: 'Failed to Delete employee. Please check your input.'
                        });
                    }
                });
            }
        });
    });

    /*Delete Employee End */

});
