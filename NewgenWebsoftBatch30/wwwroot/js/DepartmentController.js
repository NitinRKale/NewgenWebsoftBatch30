$(document).ready(function () {
    // Allow only alphabetic characters in DeptName field
    $('input[name="DeptName"]').on('keypress', function (e) {
        var char = String.fromCharCode(e.which);
        if (!/^[a-zA-Z ]$/.test(char)) {
            e.preventDefault();
        }
    });

    // Set up anti-forgery token globally
    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        var token = $('input[name="__RequestVerificationToken"]').val();
        if (token) {
            jqXHR.setRequestHeader('__RequestVerificationToken', token);
        }
    });

    /* Create Department */
    $('#departmentForm').on('submit', function (e) {
        e.preventDefault();
        $('span.text-danger').text('');
        var isValid = true;
        $('.form-control[required]').each(function () {
            if (!$(this).val()) {
                isValid = false;
                var fieldName = $(this).attr('name');
                $('[data-valmsg-for="' + fieldName + '"]').text('This field is required.');
            }
        });
        if (!isValid) return;

        var formData = new FormData(this);

        $.ajax({
            url: '/Department/Create',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result.success) {
                    Swal.fire({
                        title: 'Saved',
                        icon: 'success',
                        text: result.message,
                        button: 'Close'
                    }).then(() => window.location.href = result.redirectTo);
                } else {
                    Swal.fire('Error', result.message, 'error');
                }
            },
            error: function (xhr) {
                Swal.fire('Error', 'An unexpected error occurred: ' + xhr.responseText, 'error');
            }
        });
    });

    /* Edit Department */
    $('#editForm').on('submit', function (e) {
        e.preventDefault();
        var isValid = true;
        $('.form-control[required]').each(function () {
            if (!$(this).val()) {
                isValid = false;
                var fieldName = $(this).attr('name');
                $('[data-valmsg-for="' + fieldName + '"]').text('This field is required.');
            }
        });
        if (!isValid) return;

        var formData = new FormData(this);

        $.ajax({
            url: '/Department/Edit',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (result) {
                if (result.success) {
                    Swal.fire({
                        title: 'Updated',
                        icon: 'success',
                        text: result.message,
                        button: 'Close'
                    }).then(() => window.location.href = result.redirectTo);
                } else {
                    Swal.fire('Error', result.message, 'error');
                }
            },
            error: function (xhr) {
                Swal.fire('Error', 'An unexpected error occurred: ' + xhr.responseText, 'error');
            }
        });
    });

    /* Delete Department */
    $('#btnDelete').on('click', function (e) {
        e.preventDefault();
        var deptId = parseInt($('#DeptId').val());
        var token = $('input[name="__RequestVerificationToken"]').val();

        if (!deptId || deptId <= 0) {
            Swal.fire('Error', 'Invalid department selected.', 'error');
            return;
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to delete this department?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: '/Department/DeleteDept',
                    type: 'POST',
                    contentType: 'application/json',
                    dataType: 'json',
                    headers: { '__RequestVerificationToken': token },
                    data: JSON.stringify({ id: deptId }),
                    success: function (response) {
                        if (response.success) {
                            Swal.fire({
                                title: 'Deleted',
                                icon: 'success',
                                text: response.message,
                                button: 'Close'
                            }).then(() => window.location.href = response.redirectTo);
                        } else {
                            Swal.fire('Error', response.message || 'Failed to delete department.', 'error');
                        }
                    },
                    error: function (xhr, status, error) {
                        Swal.fire('Error', 'Unexpected error: ' + xhr.responseText, 'error');
                    }
                });
            }
        });
    });
});