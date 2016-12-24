<?php
//添加订单的接口  结算的时候添加订单

	//用于跨域
  // header('Access-Control-Allow-Origin: http://localhost:8855');
   //header('Access-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept');
   //var_dump($_POST);

$result = array();

if (!empty($_POST)) {
	//执行添加，添加订单的请求方式应为POST，参数orders:json(购物车的数据)是转化为Json字符串的（购物车内的信息），添加订单就是把购物车的数据拿过来, 参数还有address：地址，name：收货人，phone：电话，info：备注,userId:用户id
	require "./extends/Model.class.php";
	require "./extends/config.php";

	$model = new Model("diy_orders");

	$data = array();
	$data['order_name'] = $_POST['name'];
	$data['order_address'] = $_POST['address'];
	$data['order_phone'] = $_POST['phone'];
	$data['order_info'] = $_POST['info'];
	$data['order_addtime'] = time();
	$data['users_id'] = $_POST['userId'];

	$id = $model->add($data);//添加至diy_orders数据表中

	if ($id > 0) {
		//添加成功
		$detailsModel = new Model("diy_orderdetails");

		$details = json_decode($_POST['orderDetails'], true);//$_POST['orderDetails']是POST方式传递过来的商品详情，true把$_POST['orderDetails']对象变为数组

		foreach ($details as $key => $val) {
			$detail_data = array();
			//订单详情表diy_orderdetails要添加的内容
			$detail_data['order_id'] = $id;
			$detail_data['diy_id'] = $key;
			$detail_data['diy_title'] = $val['product_name'];
			$detail_data['diy_price'] = $val['product_price'];
			$detail_data['diy_image'] = $val['product_images'];
			$detail_data['orderdetails_number'] = $val['shopcar_num'];
			//添加至详情表diy_orderdetails
			$detailsModel->add($detail_data);
		}

	} else {
		$result['code'] = 2;
		$result['data'] = "订单添加失败";
	}

} else {
	$result['code'] = 1;
	$result["data"] = "数据为空";
}

echo json_encode($result);


	