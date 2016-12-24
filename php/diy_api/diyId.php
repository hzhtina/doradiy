<?php
	require "./extends/Model.class.php";
	require "./extends/config.php";

	if(isset($_GET['id'])){
		//$idMap['book_id'] = $_GET['id'];
		// id=1
		$diyId = $_GET['id'];
		$diyModel = new Model("diy_books");
		$findResult = $diyModel->find($diyId);
		if($findResult){
			$tempBook['id'] = $findResult['diy_id'];
			$tempBook['title'] = $findResult['diy_title'];
			//$tempBook['author'] = $findResult['diy_author'];
			$tempBook['price'] = $findResult['diy_price'];
			$tempBook['store'] = $findResult['diy_store'];
			$tempBook['sale'] = $findResult['diy_sale'];
			$tempBook['des'] = $findResult['diy_des'];
			$tempBook['uptime'] = $findResult['diy_uptime'];


			// 根据bookid 去相关的查询图片的信息
			$imageModel = new Model('diy_images');
			$selectResult =$imageModel->where("diy_id=$diyId")->select();
			if($selectResult){
				$tempBook['images'] = $selectResult;
			}else{
				$tempBook['images'] = [];
			}
			// 根据bookid 去查找关联的产品
			/*$relationModel = new Model("b_relatebook");
			$relationResult = $relationModel->where("book_id=$bookId")->select();
			if($relationResult){
				foreach($relationResult as $key => $value){
					$relate_bookid =  $value['relate_bookid'];
					$relateResult = $imageModel->where("book_id = $relate_bookid")->select();
					if($relateResult){
						$value['images'] = $relateResult;
					}else {
						$value['images'] = [];
					}
					$relationArray[] = $value;
				}
				$tempBook["relation"] = $relationArray;
			}else {
				$tempBook['relation'] = [];
			}*/
			$result['code'] = 0;
	        $result['data'] = $tempBook;
		}else{
			$result['data'] = 'no find data';
			$result['code'] = 1;
		}
	}else{
		$result['data'] = 'no id params';
		$result['code'] = 3;	
	}
	//header('Access-Control-Allow-Origin: http://localhost:8855');
	echo json_encode($result);

