$(document).ready(function(){
    $('#searchButton').click(function(){
        var searchText = $('#searchInput').val().toLowerCase();
        $('#searchResults').empty();
        $.ajax({
            type: 'GET',
            url: 'products.xml',
            dataType: 'xml',
            success: function(xml){
                $(xml).find('product').each(function(){
                    var name = $(this).find('name').text().toLowerCase();
                    if(name.includes(searchText)){
                        var price = $(this).find('price').text();
                        var available = $(this).find('available').text();
                        var result = '<div class="card mb-3"><div class="card-body">';
                        result += '<h5 class="card-title">' + $(this).find('name').text() + '</h5>';
                        result += '<p class="card-text">Price: Kshs. ' + price + '</p>';
                        result += '<p class="card-text">Available: ' + available + '</p>';
                        result += '</div></div>';
                        $('#searchResults').append(result);
                    }
                });
            },
            error: function(){
                alert('Error loading XML document');
            }
        });
    });

    $('#resetButton').click(function(){
        $('#searchInput').val('');
        $('#searchResults').empty();
    });
});
