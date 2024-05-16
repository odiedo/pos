<?php
include 'include/conn.php';

$sql = "SELECT * FROM products";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo '<div class="col col-6 col-md-4 mb-2">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">'.$row['name'].'</h5>
                        <p class="card-text">Kshs. '.$row['price'].'</p>
                        <button class="btn btn-primary add-to-cart" data-id="'.$row['id'].'" data-name="'.$row['name'].'" data-price="'.$row['price'].'" data-available="'.$row['available'].'">Add to Cart</button>
                    </div>
                </div>
              </div>';
    }
} else {
    echo "0 results";
}
$conn->close();
?>