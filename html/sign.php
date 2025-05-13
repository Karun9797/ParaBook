
<?php
// Replace with your DB credentials
$servername = "localhost";
$username = "root";
$password = "";
$database = "parabook";

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Collect and sanitize inputs
$firstName = $conn->real_escape_string($_POST['firstName']);
$lastName = $conn->real_escape_string($_POST['lastName']);
$email = $conn->real_escape_string($_POST['email']);
$contact = $conn->real_escape_string($_POST['contact']);
$password = password_hash($_POST['password'], PASSWORD_DEFAULT); // hash for security
$conPassword = $_POST['confirmPassword'];
$dob = $_POST['DOB'];
$country = $_POST['country']; // fallback
$userType = $_POST['userType'];
$gender = $_POST['gender'];


// Password confirmation check
if ($_POST['password'] !== $conPassword) {
    die("Passwords do not match.");
}

// SQL Insert
$sql = "INSERT INTO users (first_name, last_name, email, contact, password, dob, country, user_type, gender)
        VALUES ('$firstName', '$lastName', '$email', '$contact', '$password', '$dob', '$country', '$userType', '$gender')";

if ($conn->query($sql) === TRUE) {
   // echo "Signup successful!";
   $conn->close();
    include("login.php");
} else {
    echo "Error: " . $conn->error;
}

//$conn->close();
?>
