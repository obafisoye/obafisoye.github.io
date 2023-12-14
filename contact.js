function validate(e) {
	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting
		e.preventDefault();

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	return true;
}

function resetForm(e) {
	// Confirm that the user wants to reset the form.
	if (confirm('Clear information?')) {
		// Ensure all error fields are hidden
		hideErrors();

		// Set focus to the first text field on the page
		document.getElementById("name").focus();

		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}

	// Prevents the form from resetting
	e.preventDefault();

	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;
}

function formHasErrors() {
	let errorFlag = false;

	//	Complete the validations below
	let requiredFields = ["name", "phone", "email", "comments"];

	for(let i = 0; i < requiredFields.length; i++){
		let textField = document.getElementById(requiredFields[i]);
		if(!fieldHasInput(textField)){
			document.getElementById(requiredFields[i] + "_error").style.display = "block";

			if(!errorFlag){
				textField.focus();
			}

			errorFlag = true;
		}
	}

	let emailPattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
	let emailValue = document.getElementById("email").value;

	if(!emailPattern.test(emailValue)){
		document.getElementById("emailformat_error").style.display = "block";

		if(!errorFlag){
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		errorFlag = true;
	}

    let numberPattern = new RegExp (/^[0-9]{10}$/);
    let phoneValue = document.getElementById("phone").value;

    if(!numberPattern.test(phoneValue)){
		document.getElementById("phoneformat_error").style.display = "block";

		if(!errorFlag){
			document.getElementById("phone").focus();
			document.getElementById("phone").select();
		}

		errorFlag = true;        
    }

	return errorFlag;
}

function fieldHasInput(fieldElement){
	if(fieldElement.value == null || trim(fieldElement.value) == "")
	{
		return false;
	}

	return true;
}

function trim(str) 
{
	return str.replace(/^\s+|\s+$/g,"");
}

function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

function load() {
    hideErrors();

    document.getElementById("submit").addEventListener("click", validate);
    document.getElementById("reset").addEventListener("click", resetForm);
}

document.addEventListener("DOMContentLoaded", load);