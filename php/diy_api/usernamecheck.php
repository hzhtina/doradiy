<?php 
	require "./extends/Model.class.php";
	require "./extends/config.php";

	$model = new Model("users");

	@$username = $_POST['username'];//在出现notice代码之前加上@，@表示这行有错误或是警告不要输出，@$username=$_post['username']; 

	$data = $model->select();

	if($data){
		$resultArray = array();
		foreach($data as $key => $vaule){
			if($vaule['users_name'] === $username){
				$result['code'] = 0;
				$result['data'] = "用户名已存在";
				break;//跳出foreach循环

			}else{
				$result['code'] = 1;
				$result['data'] = "用户名可用";
			}
		}
	}else{
		$result['code'] = 2;
		$result['data'] = "用户名可用";
	}

	echo json_encode($result);
	
?>