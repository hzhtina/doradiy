<?php
	require "./extends/Model.class.php";
	require "./extends/config.php";
	// http://localhost/phphomework/xm/php/diy_api/book.php

	$diyModel = new Model("diy_books");
	$selectResult = $diyModel->select();
	//var_dump($selectResult);
	//var_dump($result);
	//数据分页
	if($selectResult){

		$resultArray = array();//声明一个空数组
		foreach ($selectResult as $key => $value) {
			$tempBook['id'] = $value['diy_id'];
			$tempBook['title'] = $value['diy_title'];
			// $tempBook['author'] = $value['diy_author'];
			$tempBook['price'] = (double)$value['diy_price'];
			$tempBook['store'] = $value['diy_store'];
			$tempBook['des'] = $value['diy_des'];
			$tempBook['sale'] = $value['diy_sale'];
			$tempBook['uptime'] = $value['diy_uptime'];
			$tempBook['status'] = $value['diy_status'];

			$imageModel = new Model('diy_images');
			$diyId = $value['diy_id'];
			$imageResult =$imageModel->where("diy_id=$diyId")->select();
			if($imageResult){
				$tempBook['images'] = $imageResult;
			}else{
				$tempBook['images'] = [];
			}
			$resultArray[] = $tempBook;//$tempBook是一个一维数组，$reaultArray是一个二维数组
		}
		// 创建了一个新二维数组$result
		$result['code'] = 0;
		$result['data'] = $resultArray;
		
	}else {
		$result['code'] = 1;
		$result['data'] = 'no data';
	}
	//header('Access-Control-Allow-Origin: http://localhost:8855');
	// echo "<pre>";
	// print_r($result);
	// echo "</pre>";

	echo json_encode($result);

