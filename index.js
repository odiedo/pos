    $(document).ready(function(){
        // Initialize cart from localStorage
        var cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Function to save cart to localStorage
        function saveCart() {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Add to cart button click event
        $('.add-to-cart').click(function(){
            var name = $(this).data('name');
            var price = Number($(this).data('price'));
            var available = Number($(this).data('available'));

            // Check if item is already in cart
            var item = cart.find(item => item.name === name);
            if (item) {
                if (item.quantity < available) {
                    item.quantity++;
                    displaySuccessAlert();
                } else {
                    displayErrorAlert('Sorry, the maximum available quantity for this item has been reached.');
                }
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
                displaySuccessAlert();
            }

            // Save cart to localStorage
            saveCart();

            // Refresh cart display
            displayCart();
        });


        // AJAX live search function
        $("#search").on("keyup", function() {
            var query = $(this).val();

            $.ajax({
                url: 'search.php',
                type: 'GET',
                data: {q: query},
                success: function(data) {
                    $("#results").html(data);
                    // Bind event handler for "Add to Cart" buttons in search results
                    handleAddToCart();
                }
            });
        });



        // Display success alert
        function displaySuccessAlert() {
            $('.alert').remove();
            $('body').append('<div class="alert alert-success alert-dismissible fade show position-fixed" role="alert" style="top: 20px; right: 20px;">Product added to cart successfully!</div>');
            setTimeout(function(){
                $('.alert').alert('close');
            }, 2000);
        }

        // Display error alert
        function displayErrorAlert(message) {
            $('.alert').remove();
            $('body').append('<div class="alert alert-danger alert-dismissible fade show position-fixed" role="alert" style="top: 20px; right: 20px;">' + message + '</div>');
            setTimeout(function(){
                $('.alert').alert('close');
            }, 2000);
        }

        // Display cart
        function displayCart() {
            var cartList = $('#cart');
            cartList.empty();
            var total = 0;

            cart.forEach(function(item, index){
                var subtotal = item.price * item.quantity;
                total += subtotal;
                cartList.append('<li class="list-group-item">' + item.name + ' - Kshs. ' + item.price + ' x ' +
                    item.quantity + ' ' +
                    '<br> <button class="btn btn-sm btn-outline-secondary quantity-btn" data-index="' + index + '" data-type="decrease"><i class="fas fa-minus"></i></button> ' + ' ' +
                    '<button class="btn btn-sm btn-outline-secondary quantity-btn" data-index="' + index + '" data-type="increase"><i class="fas fa-plus"></i></button>' +
                    ' = Kshs. ' + subtotal + ' <span class="remove-item-btn text-danger" data-index="' + index + '">Remove</span></li>');
            });

            $('#total').text(total);

            // Update cart count in bottom navbar
            $('#cart-count').text(cart.length);

            // Attach click event handler to remove items
            $('.remove-item-btn').click(function(){
                var index = $(this).data('index');
                cart.splice(index, 1);
                saveCart();
                displayCart();
            });

            // Attach click event handler to quantity buttons
            $('.quantity-btn').click(function(){
                var index = $(this).data('index');
                var type = $(this).data('type');
                if (type === 'increase') {
                    cart[index].quantity++;
                } else if (type === 'decrease') {
                    if (cart[index].quantity > 1) {
                        cart[index].quantity--;
                    } else {
                        displayErrorAlert('Quantity cannot be less than 1.');
                    }
                }
                saveCart();
                displayCart();
            });
        }

        // Clear cart button click event
        $('#clear-cart').click(function(){
            cart = [];
            // Save empty cart to localStorage
            saveCart();
            displayCart();
        });



        // Handle checkout button click
        $('#checkout-btn').click(function(){
            // Show the payment modal
            $('#payment-modal').modal('show');

            // Reset sections visibility
            $('#customer-number-section').hide();
            $('#initiate-payment-section').hide();
            $('#receipt-section').hide();

            // Handle payment method selection change
            $('input[name="paymentMethod"]').change(function() {
                var paymentMethod = $(this).val();
                if (paymentMethod === 'cash') {
                    $('#customer-number-section').show();
                    $('#initiate-payment-section').hide();
                } else if (paymentMethod === 'mpesa') {
                    $('#customer-number-section').hide();
                    $('#initiate-payment-section').show();
                }
            });
        });

        // Handle print receipt button click
        $('#printReceiptBtn').click(function() {
            window.print();
        });


        // Initial display of cart
        displayCart();
    });