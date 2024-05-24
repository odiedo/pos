<?php
include 'include/conn.php';

$sql = "SELECT * FROM products LIMIT 4";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo '<li class="col p-0 m-2 list-inline-item">
                <div class="card p-0 m-0 shadow-none border-0   bg-transparent" style="animation: fadeInUp .5s ease-in-out;">
                    <div class="card-body">
                        <h5 class="card-title">'.$row['name'].'</h5>
                        <p class="card-text">Kshs. '.$row['price'].'</p>
                        <button class="btn btn-primary add-to-cart" data-id="'.$row['id'].'" data-name="'.$row['name'].'" data-price="'.$row['price'].'" data-available="'.$row['available'].'">Add to Cart</button>
                    </div>
                </div>
            </li>';
    }
} else {
    echo "0 results";
}
$conn->close();
?>