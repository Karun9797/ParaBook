<?php
require '../vendor/autoload.php';
include("connection.php");
// Collect and sanitize inputs
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
$firstNamee = $_POST['firstName'];
$lastNamee = $_POST['lastName'];
$emaill = $_POST['email'];
$contactt = $_POST['contact'];
$passwordd = $_POST['password'];
$hashedPassword = password_hash($passwordd, PASSWORD_DEFAULT);// hash for security
$conPassword = $_POST['confirmPassword'];
$dobb = $_POST['DOB'];
$countryy = "Nepal";
// $_POST['country']; // fallback
$userTypee = $_POST['userType'];
$genderr = $_POST['gender'];
$check_email = "SELECT * FROM users WHERE email = '$emaill'";
$check_eemail = mysqli_query($connecr, $check_email);
function sendmail_verify($firstNamee, $emaill, $_verify)
{
// Replace with your DB credentials
$servername = "localhost";
$username = "root";
$password = "";
$database = "parabook";



    $mail = new PHPMailer(true);
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
    $mail->isSMTP();                                            //Send using SMTP
    //Set the SMTP server to send through
    $mail->Host = "smtp.gmail.com";                     //Set the SMTP server to send through
    $mail->SMTPAuth = true;
    //Enable SMTP authentication
    $mail->Username = 'saradcr7adhikari@gmail.com';                     //SMTP username
    $mail->Password = 'vtsl wtoo zusf ojbp';                               //SMTP password
    $mail->SMTPSecure = 'tls';            //Enable implicit TLS encryption
    $mail->Port = 587;
    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    $mail->setFrom('saradcr7adhikari@gmail.com', $firstNamee); //Set sender's email and name
    $mail->addAddress($emaill);     //Add a recipient
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Email Verification From PARABOOK SYSTEM';
    $email_body = "<h1>Hi $firstNamee,</h1> <h5> VERIFY YOUR EMAIL</h5><p>Click the link to verify your email: ></h5>";
    $mail->Body = $email_body;
    $mail->send();
    echo "<script>alert('Verification email sent!');</script>";


}       //$headers = "From:
{
    // $subject = "Email Verification";
    // $message = "Click the link to verify your email: http://localhost/your_project/verify.php?token=$token";
}


if (mysqli_num_rows($check_eemail) > 0) {
    echo "<script>alert('Email already exists!');</script>";
    echo "<script>window.location.href='signup.php';</script>";
    //exit();

// SQL Insert
$sql = "INSERT INTO users (first_name, last_name, email, contact, password, dob, country, user_type, gender)
        VALUES ('$firstName', '$lastName', '$email', '$contact', '$password', '$dob', '$country', '$userType', '$gender')";

if ($conn->query($sql) === TRUE) {
   // echo "Signup successful!";
   $conn->close();
    include("login.php");

} else {
    $_verify = md5(rand());
    $_data = ("INSERT INTO users (firstname, lastname,email,contact,password,d_o_b,country,status,Gender,verify_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)");
    $_data = $connecr->prepare("$_data");
    $_data->bind_param("ssssssssss", $firstNamee, $lastNamee, $emaill, $contactt, $hashedPassword, $dobb, $countryy, $userTypee, $genderr, $_vrerify);
    $_data->execute();
    if ($_data) {
        echo "<script>alert('Registration successful!');</script>";
        //  echo "<script>window.location.href='login.php';</script>";
        sendmail_verify($firstNamee, $emaill, $_verify);
        echo "sendmail_verify";
    } else {
        echo "<script>alert('Registration failed!');</script>";
        echo "<script>window.location.href='sign.php';</script>";
    }
    $connecr->close();
    $_data->close();
}
}
?>