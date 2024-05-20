document.getElementById('processButton').addEventListener('click', function() {
    var phone = document.getElementById('phone').value;
    var amount = document.getElementById('amount').value;

    if (phone && amount) {
        // Simulate an AJAX request
        setTimeout(function() {
            // Step 1 completed, hide it
            document.getElementById('step1').style.display = 'none';

            // Show step 2
            document.getElementById('step2').style.display = 'block';

            // Populate the receipt
            var receiptText = `Phone: ${phone}<br>Amount: $${amount}`;
            document.getElementById('receipt').innerHTML = receiptText;
        }, 500); // Simulating a delay for the AJAX call
    } else {
        alert('Please fill in all fields.');
    }
});

document.getElementById('completeButton').addEventListener('click', function() {
    alert('Transaction Complete!');
    // Optionally, you can reset the form and go back to step 1
    document.getElementById('formStep1').reset();
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
});
