<?php
$query = $_GET['q'];

if (!empty($query)) {
    $xml = simplexml_load_file('products.xml');

    $hint = "";
    foreach ($xml->product as $product) {
        $name = $product->name;
        $price = $product->price;
        $description = $product->description;

        // Check if the product name contains the query
        if (stripos($name, $query) !== false) {
            $hint .= "<div>";
            $hint .= "<h2>$name</h2>";
            $hint .= "<p><strong>Price:</strong> $price</p>";
            $hint .= "<p><strong>Description:</strong> $description</p>";
            // Add button to add product to cart
            $hint .= "<button class='add-to-cart' data-name='$name' data-price='$price'>Add to Cart</button>";
            $hint .= "</div>";
        }
    }

    if ($hint == "") {
        $response = "No products found.";
    } else {
        $response = $hint;
    }

    echo $response;
}
?>
