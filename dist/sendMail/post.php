<?php
if (isset($_POST['MERGE0']) && !empty($_POST['MERGE0'])) {

    $firstName = isset($_REQUEST['MERGE1']) && !empty($_REQUEST['MERGE1']) ? $_REQUEST['MERGE1'] : '';
    $lastName = isset($_REQUEST['MERGE2']) && !empty($_REQUEST['MERGE2']) ? $_REQUEST['MERGE2'] : '';
    $email = isset($_REQUEST['MERGE0']) && !empty($_REQUEST['MERGE0']) ? $_REQUEST['MERGE0'] : '';
    $phone = isset($_REQUEST['MERGE4']) && !empty($_REQUEST['MERGE4']) ? $_REQUEST['MERGE4'] : '';

    require("class.phpmailer.php");

    $mail = new PHPMailer();

    $mail->IsSMTP();                                      // set mailer to use SMTP
    $mail->Host = "smtp.gmail.com";  // specify main and backup server
    $mail->SMTPAuth = true;     // turn on SMTP authentication
    $mail->SMTPSecure = "tls";
    $mail->Username = "manoj.garwa@experienceflow.com";  // SMTP username
    $mail->Password = "anumanoj@143"; // SMTP password

    $mail->From = $email;
    $mail->FromName = "Website Demo Request Mail";
    $mail->AddAddress("mkgarwa@gmail.com", "Manoj Kumar");
//    $mail->AddAddress("ellen@example.com");                  // name is optional
    $mail->AddReplyTo("manoj.garwa@experienceflow.com", "YTree");

    $mail->WordWrap = 50;                                 // set word wrap to 50 characters
    $mail->IsHTML(true);                                  // set email format to HTML

    $mail->Subject = "Experience Flow Webmail";

    $mail->Body = "<table cellspacing='0' cellpadding='15' border='0' style='border:1px solid #000' width='600'>";
    $mail->Body .= "<tr><th style='border-right: 1px solid #000;border-bottom: 1px solid #000;'>First Name</th><td style='border-bottom: 1px solid #000;'>" . $firstName . "</td></tr>";
    $mail->Body .= "<tr><th style='border-right: 1px solid #000; border-bottom: 1px solid #000;'>Last Name</th><td style='border-bottom: 1px solid #000;'>" . $lastName . "</td></tr>";
    $mail->Body .= "<tr><th style='border-right: 1px solid #000; border-bottom: 1px solid #000;'>Email Address</th><td style='border-bottom: 1px solid #000;'>" . $email . "</td></tr>";
    $mail->Body .= "<tr><th style='border-right: 1px solid #000;'>Phone Number</th><td>" . $phone . "</td></tr>";
    $mail->Body .= "</table>";


    if (!$mail->Send()) {
        echo json_encode(['status' => 'ERROR']);
        exit;
    } else {
        echo json_encode(['status' => 'OK']);
        exit;
    }
}
echo json_encode(['status' => 'ERROR']);
exit;