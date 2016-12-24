<?php 
//获取订单的接口  登录完成后，点击“我的订单”的时候获取订单
$result = array();

if (!empty($_GET['users_id'])) {
	//获取订单时，只需传一个用户id（users_id）即可，故请求方式为GET（根据GET与POST的原则，获取订单并没有对服务器产生影响，只是获取了数据），登录个人中心后需要查看订单
	$id = $_GET['users_id'];

	require "./extends/config.php";
	require "./extends/Model.class.php";

	$model = new Model("diy_orders");

	$order_data = $model->where("users_id={$id}")->select();//查出指定的users_id的对应的数据,即用户对应的订单

	//取出商品详情（每份订单可能不止一份商品）
	$detailModel = new Model("diy_orderdetails");

	foreach ($order_data as &$val) {
		//&$val取地址符
		//遍历$order_data,把order_id 拿出来，并通过order_id从表diy_orderdetails中取出对应的商品信息，并存入$order_data的$val['order_details']中
		$val['order_details'] = $detailModel->where("order_id={$val['order_id']}")->select();
		// echo "<pre>";
		// print_r($order_data);
	}
	

	$result['code'] = 0;
	$result['data'] = $order_data;


} else {
	$result['code'] = 1;
	$result['data'] = "请指定用户";
}


echo json_encode($result);
 ?>