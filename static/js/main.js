function validateForm() {
    var start = document.getElementById('start_date_id').value;
    var end = document.getElementById('end_date_id').value;
    var decision = document.forms['myForm']['decision'].value;

    var age = document.getElementById('ageInput').value;

    var portalID = document.getElementById('portalInput').value

    if (Number.isNaN(parseInt(portalID))) {
        swal('Error', 'Portal ID is not valid!', 'error');
        return false;
    }

    if (!_.inRange(parseInt(age), 0, 150)) {
        swal('Error', 'Client age is not a valid number!', 'error');
        return false;
    }

    if (start == "") {
        swal('Error', 'Please enter a start date', 'error');
        return false;
    } else if (end == "") {
        swal('Error', 'Please enter an end date', 'error');
        return false;
    } else if (decision == '') {
        swal('Error', 'Please select a decision', 'error');
        return false;
    }
}


function copyFunction() {
    /* Get the text field */
    var copyText = document.getElementById("finalComment");
    copyText.select();
    document.execCommand('copy');
    /* Alert the copied text */
    swal('Copied', "successfully copied the clinician comment to your clipboard!", 'success');
    copyText.value = '';
}

function calculateDates() {
    var start_date = document.getElementById('start_date_id').value;
    var end_date = document.forms['myForm']['end_date'].value;

    if (!start_date) {
        swal('Error', 'Please enter a start date', 'error');
        return
    }

    if (!end_date) {
        swal('Error', 'Please enter an end date', 'error');
        return
    }

    let date_1 = new Date(start_date);
    let date_2 = new Date(end_date);
    let difference = date_2.getTime() - date_1.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

    if (TotalDays == 180) {
        swal(`Total days ${TotalDays}.`, '6 service units.', 'success');
    } else if (_.inRange(TotalDays, 31)) {
        swal(`Total days ${TotalDays}.`, '1 service unit.', 'warning');
    } else if (_.inRange(TotalDays, 31, 61)) {
        swal(`Total days ${TotalDays}.`, '2 service units.', 'warning');
    } else if (_.inRange(TotalDays, 61, 91)) {
        swal(`Total days ${TotalDays}.`, '3 service units.', 'warning');
    } else if (_.inRange(TotalDays, 91, 121)) {
        swal(`Total days ${TotalDays}.`, '4 service units.', 'warning');
    } else if (_.inRange(TotalDays, 121, 151)) {
        swal(`Total days ${TotalDays}.`, '5 service units.', 'warning');
    } else if (_.inRange(TotalDays, 151, 180)) {
        swal(`Total days ${TotalDays}.`, '6 service units.', 'warning');
    } else {
        swal(`Total days ${TotalDays}.`, 'This requires 6 service units and INFO detail', 'info');
    }
}

function revealModForm() {
    var approved = document.getElementById('approved').checked;
    var modified = document.getElementById('modified').checked;
    var pend = document.getElementById('pend').checked;

    if (modified) {
        document.getElementById('hidden_modified').style.display = 'block';
    } else {
        document.getElementById('hidden_modified').style.display = 'none';
    }
}


function mdSignatureCheck() {
    var md_date = document.getElementById('md_date').value;
    var start_date = document.getElementById('start_date_id').value;

    if (!start_date) {
        swal('Error', 'Ensure requested start date is filled on main form', 'warning')
        $('#myModal').modal('hide');
        return
    }

    var md_date_obj = new Date(md_date)
    var req_date_obj = new Date(start_date)
    const diffTime = Math.abs(req_date_obj - md_date_obj);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 31) {
        swal(`${diffDays} days`, 'Valid signature date', 'success')
    } else {
        swal(`${diffDays} days`, 'This is an INVALID signature date', 'error')
    }
}


function calculateServiceDenied() {
    var start_date = document.getElementById('mod_den_start_id').value;
    var end_date = document.getElementById('mod_den_end_id').value;

    if (start_date === "" || end_date === "") {
        swal('Error', 'Please enter dates to calculate', 'warning')
        return
    }

    let date_1 = new Date(start_date);
    let date_2 = new Date(end_date);
    let difference = date_2.getTime() - date_1.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

    if (TotalDays == 180) {
        swal('6 service units.', `Total days: ${TotalDays}`, 'success');
    } else if (_.inRange(TotalDays, 31)) {
        swal('1 service unit.', `Total days: ${TotalDays}`, 'warning');
    } else if (_.inRange(TotalDays, 31, 61)) {
        swal('2 service units.', `Total days: ${TotalDays}`, 'warning');
    } else if (_.inRange(TotalDays, 61, 91)) {
        swal('3 service units.', `Total days: ${TotalDays}`, 'warning');
    } else if (_.inRange(TotalDays, 91, 121)) {
        swal('4 service units.', `Total days: ${TotalDays}`, 'warning');
    } else if (_.inRange(TotalDays, 121, 151)) {
        swal('5 service units.', `Total days: ${TotalDays}`, 'warning');
    } else if (_.inRange(TotalDays, 151, 180)) {
        swal('6 service units.', `Total days: ${TotalDays}`, 'warning');
    } else {
        swal('6 service units and INFO detail', `Total days ${TotalDays}.`, 'info');
    }
}

function calculateServiceApp() {
    var start_date = document.getElementById('mod_app_start_id').value;
    var end_date = document.getElementById('mod_app_end_id').value;

    if (start_date === "" || end_date === "") {
        swal('Error', 'Please enter dates to calculate', 'warning')
        return
    }

    let date_1 = new Date(start_date);
    let date_2 = new Date(end_date);
    let difference = date_2.getTime() - date_1.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24)) + 1;

    if (TotalDays == 180) {
        swal('6 service units.', `Total days: ${TotalDays}`, 'success');
    } else if (_.inRange(TotalDays, 31)) {
        swal('1 service unit.', `Total days: ${TotalDays}`, 'warning');
    } else if (_.inRange(TotalDays, 31, 61)) {
        swal('2 service units.', `Total days: ${TotalDays}`, 'warning');
    } else if (_.inRange(TotalDays, 61, 91)) {
        swal('3 service units.', `Total days: ${TotalDays}`, 'warning');
    } else if (_.inRange(TotalDays, 91, 121)) {
        swal('4 service units.', `Total days: ${TotalDays}`, 'warning');
    } else if (_.inRange(TotalDays, 121, 151)) {
        swal('5 service units.', `Total days: ${TotalDays}`, 'warning');
    } else if (_.inRange(TotalDays, 151, 180)) {
        swal('6 service units.', `Total days: ${TotalDays}`, 'warning');
    } else {
        swal('6 service units and INFO detail', `Total days ${TotalDays}.`, 'info');
    }
}


$("#end_date_id").keydown(function () {
    if ($(this).val()) {
        $("#req_dos_button").show();
    } else {
        $("#req_dos_button").hide();
    }
});

$("#mod_den_end_id").keydown(function () {
    if ($(this).val()) {
        $("#den_service_button").show();
    } else {
        $("#den_service_button").hide();
    }
});
$("#mod_app_end_id").keydown(function () {
    if ($(this).val()) {
        $("#app_service_button").show();
    } else {
        $("#app_service_button").hide();
    }
});