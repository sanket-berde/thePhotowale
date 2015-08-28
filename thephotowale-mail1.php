<?

      $mailto="info@thephotowale.com";  //Enter recipient email address here

       $subject = "Email From Contact Us";

       $from="info@thephotowale.com";          //Your valid email address here

$name = $_REQUEST['fname']." ".$_REQUEST['lname'];
$email = $_REQUEST['Email'];
$telephone = $_REQUEST['Telephone'];
$city = $_REQUEST['city'];
$message = $_REQUEST['Message'] ;

$wholeMessage = "Name : ".$name."\r\n"."Email : ".$email."\r\n"."Telephone : ".$telephone."\r\n"."City : ".$city."\r\n"."Message : ".$message."\r\n";
	   
       $message_body = $wholeMessage;

       echo mail($mailto,$subject,$message_body,"From:".$from);
       //header("Location: index.htm");

?>