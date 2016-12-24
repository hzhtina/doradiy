<?php 
	//执行注册，只需返回注册成功或失败，只能提交post数据
	$res = array();
	if(empty($_POST['username']) || empty($_POST['password'])) {
		// 用户名或密码为空时，注册失败
		$res['code'] = 1;
		$res['data'] = "用户名或密码不能为空";//指出注册失败原因
	}else{
		require "./extends/Model.class.php";
		require "./extends/config.php";

		$model = new Model("users");

		// 传过来的username与数据库中users表内的字段名不一致，故新建一个数组来解决字段不匹配的问题
		$data = array();
		$data["users_name"] = $_POST['username'];
		$data["users_pass"] = md5($_POST['password']);
		// $model执行一个方法add(),向数据表中 添加一条数据,将$data传过去，但若数据有问题，插入会失败，所以做一个判断
		if($model->add($data) > 0) {
			// 插入成功  注册成功
			$res['code'] = 0;
			$res['data'] = "success register";
		}else{
			//插入失败  注册时插入失败
			$res["code"] = 2;
			$res["data"] = "error register";
		}
	}

	echo json_encode($res);
?>