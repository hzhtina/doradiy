(function(){
	angular.module("diyDetailCtrlModule", [])
	       .controller("diyDetailCtrl", ["$scope","cookieService","$routeParams","getDiyData", "IMAGEPATH", "shopcarData","$location", function($scope, cookieService, $routeParams, getDiyData, IMAGEPATH,shopcarData,$location) {
	       		// $routeParams服务用于接收商品详情页中传过来的"/diyDetail/:id中的id
	       		$scope.diydetail = {};
	       		$scope.IMAGEPATH = IMAGEPATH;
	       		//从数据库中获取商品详情的信息
	       		getDiyData.requestData("diyId.php", {id:$routeParams.id}, function(data){
	       			$scope.diydetail = data;
	       			console.log($scope.diydetail);
	       		}, function(error){
	       			console.log(error);
	       		})

				$scope.carList = shopcarData.data;//shopcarData.data是添加商品到购物车时存在缓存中的购物车内的商品信息
				console.log($scope.carList);
	       		//添加购物车  添加之前，判断用户是否已经登录，登录后才能添加商品
	       		$scope.addShopcara = function(product){

	       			if(cookieService.getCookie('user')){
	       				//用户已登录 ,可以添加购物车
	       				//判断购物车中是否已经存在该商品
		       			if ($scope.carList[product.id]) {

		       				$scope.carList[product.id].shopcar_num ++;

		       			} else {
			       			$scope.carList[product.id] = {
			       				"product_name" : product.title,
			       				"product_price" : product.price,
			       				"shopcar_num" : 1,
			       				"product_images": product.images[0].image_name
			       			}
			       		}
	       			}else{
	       				//用户未登录，跳转至登录页面
	       				$location.path("/login");
	       			}

	       			
		       		

	       		}
	       		


	       }])
})()