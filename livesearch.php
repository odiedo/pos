<?php
include 'include/conn.php';

$query = $_GET['q'];

if (!empty($query)) {
    // SQL query to search for products
    $sql = "SELECT * FROM products WHERE name LIKE '%$query%'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $response = "";
        // Output data of each row
        while ($row = $result->fetch_assoc()) {
            $id = $row["id"];
            $name = $row["name"];
            $price = $row["price"];
            $available = $row["available"];
            $description = "Description not available";
            
            $response .= "<a href='#' class='pl-2 pr-2 d-flex justify-content-between search-results' data-toggle='modal' data-target='#productModal' data-id='$id' data-name='$name' data-price='$price' data-available='$available' data-description='$description'>";
            $response .= "<h6>$name</h6>";
            $response .= "Kshs. $price";
            $response .= "</a>";
        }
    } else {
        $response = "No products found.";
    }

    echo $response;
}

$conn->close();
?>
