<?php
    
    header("Access-Control-Allow-Origin:*");
    header("Content-type:text/html;charset=UTF-8");
    //获取手机号/用户名
    $username = $_GET["user"];
    //查询语句
    $select = "select * from huawei_user WHERE username = '$username'";
    //连接数据库
    $coon = new mysqli("localhost","root","","vamll_user","3306");

    //读库
	$coon -> query("SET CHARACTOR SET 'utf8'");
	
	//写库
    $coon -> query("SET NAMES 'utf8'");
    
    //执行sql语句
	$result = $coon -> query($select);
    $rows = $result -> fetch_assoc();
    
    if($rows) {
        // 数据已经存在
		$arr = array("code" => "0", "data" => "用户名称已经存在");
		
    } else {
		$arr = array("code" => "10000", "data" => "输入正确");

    }
	echo json_encode($arr);
?>