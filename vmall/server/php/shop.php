<?php
    header("Access-Control-Allow-Origin:*");
    header("Content-type:text/html;charset=UTF-8");
    //获取json数据
    $json = file_get_contents('../json/shop.json');
    print_r($json);
?>