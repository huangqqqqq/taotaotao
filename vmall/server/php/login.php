<?php
    header("Access-Control-Allow-Origin:*");
    header("Content-type:text/html;charset=UTF-8");
    //获取手机号/用户名
    $username = $_GET["user"];
    $pass = $_GET["pass"];
    //查询用户名语句
    $sql = "select password from huawei_user WHERE username = '$username'";
    //插入数据
    // $insert = "INSERT into huawei_user (username, password, mark) values ('$username', '$pass', '自动注册')";
    //连接数据库
    $coon = new mysqli("localhost","root","","vamll_user","3306");

    //读库
	$coon -> query("SET CHARACTOR SET 'utf8'");
	
	//写库
    $coon -> query("SET NAMES 'utf8'");
    
    //执行sql语句
    $result = $coon -> query($sql);
    //找到返回关联数组， 找不到返回null
	$rows = $result -> fetch_assoc();

    if($rows) {
        // 用户名称已经存在
        if($rows["password"] == $pass) {
            $arr = array("code" => "0", "data" => "$username");
            // echo "
            //     <script>
            //         location.href = 'manager.html?username=$username';
            //     </script>;
            // ";
        } else {
            $arr = array("code" => "10000", "data" => "密码输入错误");
            // echo "
            // <script>
            //     alert('密码错误');
            //     location.href = 'login.html';
            // </script>;
            // ";
        }

    }
    echo json_encode($arr);
?>