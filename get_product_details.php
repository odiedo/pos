<?php
include 'include/conn.php';

$id = $_GET['id'];
$response = array();

if (!empty($id)) {
    $sql = "SELECT * FROM products WHERE id = $id";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $response = array(
            'name' => $row["name"],
            'price' => $row["price"],
            'available' => $row["available"],
            'description' => $row["description"]
        );
    }
}
echo json_encode($response);
$conn->close();
?>
