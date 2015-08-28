<?php
//header('Content-type: text/plain');
$name = $_REQUEST['fname']. " " . $_REQUEST['lname'];
$email = $_REQUEST['Email'];
$telephone = $_REQUEST['Telephone'];
$city = $_REQUEST['city'];
$message = $_REQUEST['Message'] ;

$wholeMessage = "Name : ".$name."\r\n"."Email : ".$email."\r\n"."Telephone : ".$telephone."\r\n"."City : ".$city."\r\n"."Message : ".$message."\r\n";

require("PHPMailerAutoload.php");

$mail = new PHPMailer();
$mail->IsSMTP();

$mail->Host = "mail.thephotowale.com";  // specify main and backup server 

$mail->SMTPAuth = true;     // turn on SMTP authentication
//$mail->SMTPSecure = 'ssl';  
$mail-> Port = 587;
//$mail->SMTPDebug = 1;
$mail->Username = "info@thephotowale.com";  // SMTP username 
$mail->Password = "sankettejasthephotowale"; // SMTP password

$mail->From = $email;

$mail->AddAddress("info@thephotowale.com", "The Photowale");
$mail->WordWrap = 50;
$mail->IsHTML(true);
$mail->Subject = "ABC";

$mail->Body    = $wholeMessage; 
$mail->AltBody = $wholeMessage;

if(!$mail->Send())
{
   echo "Message could not be sent.";
   echo "Mailer Error: " . $mail->ErrorInfo;
   exit;
}

echo "<script type='text/javascript'>alert('Thank You..!!');</script>";
header("Location: index.html");
exit();
    
?>