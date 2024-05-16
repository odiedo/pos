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
            $name = $row["name"];
            $price = $row["price"];
            $available = $row["available"];
            $description = "Description not available";
            
            $response .= "<div class='pl-2 pr-2 d-flex justify-content-between search-results'>";
            $response .= "<h6>$name</h6>";
            $response .= "$price";
            $response .= "</div>";
        }
    } else {
        $response = "No products found.";
    }

    echo $response;
}

$conn->close();
?>
