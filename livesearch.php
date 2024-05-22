<?php
include 'include/conn.php';

$query = $_GET['q'];

if (!empty($query)) {
    $sql = "SELECT * FROM products WHERE name LIKE '%$query%'";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        $response = "";
        while ($row = $result->fetch_assoc()) {
            $id = $row["id"];
            $name = $row["name"];
            $price = $row["price"];
            $available = $row["available"];
            $description = $row["description"];
            
            $response .= "<div class='search-result pl-2 pr-2 d-flex justify-content-between' data-id='$id' data-name='$name' data-price='$price' data-available='$available' data-description='$description' style='width: 100%; cursor: pointer; color: #f5dd06;'>";
            $response .= "<h6>$name</h6>";
            $response .= "Kshs. $price";
            $response .= "</div>";
        }
    } else {
        $response = "No products found.";
    }

    echo $response;
}

$conn->close();
?>
