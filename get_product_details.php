<?php
include 'include/conn.php';

$id = $_GET['id'];

if (!empty($id)) {
    $sql = "SELECT * FROM products WHERE id = $id";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $id = $row["id"];
        $name = $row["name"];
        $price = $row["price"];
        $available = $row["available"];
        $description = $row["description"];
        
        $response = "
            <h4 id='product-name'>$name</h4>
            <div class='description mt-4'>
                <ul>
                    <li class='d-flex justify-content-between'><span>Available:</span> <span id='product-available'>$available</span></li>
                    <li class='d-flex justify-content-between'><span>Description:</span> <span id='product-description'>$description</span></li>
                </ul>
            </div>
            <p class='price d-flex justify-content-between'>
                <span id='product-price'>Kshs. $price</span>
                <button class='btn btn-primary add-to-cart' data-id='$id' data-name='$name' data-price='$price' data-available='$available'>Add to Cart</button>
            </p>";
        
        echo $response;
    } else {
        echo "No product found.";
    }
} else {
    echo "Invalid product ID.";
}

$conn->close();
?>
