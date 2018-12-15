<?php
    header("Access-Control-Allow-Origin:*");
    header("Content-type:text/html;charset=UTF-8");

    $username = $_GET["user"];
    $pass = $_GET["pass"];
    $mark = $_GET["mark"];
     //连接数据库
     $coon = new mysqli("localhost","root","","vamll_user","3306");

     //添加语句
     $insert = "INSERT INTO huawei_user (username,password,mark) VALUES ('$username','$pass','$mark')";
//设置读库、写库字符集
	//读库
	$coon -> query("SET CHARACTOR SET 'utf8'");
	
	//写库
    $coon -> query("SET NAMES 'utf8'");
    
    $bool = $coon -> query($insert);
    if($bool){
		echo "1";
	}else{
		echo "0";
	}

?>