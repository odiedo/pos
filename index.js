$(document).ready(function(){
    fetchProducts();
    // Fetch products from server
    function fetchProducts() {
        $.ajax({
            url: 'products.php',
            method: 'GET',
            success: function(response) {
                $('#products_display').html(response);
            }
        });
    }

    // Initialize cart from localStorage
    var cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to display cart
    function displayCart() {
        var cartList = $('#cart');
        cartList.empty();
        var total = 0;

        cart.forEach(function(item, index){
            var subtotal = item.price * item.quantity;
            total += subtotal;
            cartList.append(`
                <li class="list-group-item" style="font-weight: 400">
                    <span style="font-weight: 900">${item.name} - Kshs. ${item.price} x ${item.quantity}</span>
                    <br>
                    <button class="btn btn-sm btn-outline-secondary quantity-btn" data-index="${index}" data-type="decrease"><i class="fas fa-minus"></i></button>
                    <button class="btn btn-sm btn-outline-secondary quantity-btn" data-index="${index}" data-type="increase"><i class="fas fa-plus"></i></button>
                    = Kshs. ${subtotal}
                    <span class="remove-item-btn text-danger" style="cursor:pointer" data-index="${index}">Remove</span>
                </li>
            `);
        });

        $('#total').text(total);
        $('#cart-count').text(cart.length);

        // Attach event handlers
        attachCartHandlers();
    }

    // Function to attach event handlers for cart items
    function attachCartHandlers() {
        $('.remove-item-btn').click(function(){
            var index = $(this).data('index');
            cart.splice(index, 1);
            saveCart();
            displayCart();
        });

        $('.quantity-btn').click(function(){
            var index = $(this).data('index');
            var type = $(this).data('type');
            if (type === 'increase') {
                var available = Number($('#products_display .add-to-cart[data-name="' + cart[index].name + '"]').data('available'));
                if (cart[index].quantity < available) {
                    cart[index].quantity++;
                } else {
                    displayErrorAlert('Sorry, the maximum available quantity for this item has been reached.');
                }
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


    // Add to cart button click event using event delegation
    $('#products_display').on('click', '.add-to-cart', function(){
        var name = $(this).data('name');
        var price = Number($(this).data('price'));
        var available = Number($(this).data('available'));

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

        saveCart();
        displayCart();
    });

    // Display success alert
    function displaySuccessAlert() {
        $('.alert').remove();
        $('body').append('<div class="alert alert-success alert-dismissible fade show position-fixed" role="alert" style="top: 20px; right: 20px; z-index: 1000;">Product added to cart successfully!</div>');
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

    // Clear cart button click event
    $('#clear-cart').click(function(){
        cart = [];
        saveCart();
        displayCart();
    });


    // Initial display of cart
    displayCart();
});
