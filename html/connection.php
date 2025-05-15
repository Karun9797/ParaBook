<?php
$_servernam = "localhost";
$_username = "root";
$_password = "";
$_database = "parabook";
try {

    $connecr = mysqli_connect("$_servernam", "$_username", "$_password", "$_database");


} catch (Exception $e) {
    echo $e->getMessage();
}
if ($connecr) {
    echo "Connection successful";
} else {
    echo "Connection failed";
}


?>