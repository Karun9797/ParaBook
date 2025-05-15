<?php
$_servername = "localhost";
$_username = "root";
$_password = "";
$_database = "parabook";
try {

    $connecr = mysqli_connect("$_servername", "$_username", "$_password", "$_database");


} catch (Exception $e) {
    echo $e->getMessage();
}
if ($connecr) {
    // echo "Connection successful";
} else {
    echo "Connection failed";
}


?>