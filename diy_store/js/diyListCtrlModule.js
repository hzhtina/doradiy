(function(){
	angular.module("diyListCtrlModule", [])
	       .controller("diyListCtrl", ["$scope", "getDiyData", "IMAGEPATH", "shopcarData","cookieService","$location", function($scope, getDiyData, IMAGEPATH,shopcarData,cookieService,$location) {
	       		
	       		$scope.IMAGEPATH = IMAGEPATH;
	       		//设置商品信息
	       		$scope.diyList = [];

	       		//http 请求 diy的数据  从服务器中拉取商品信息
	       		getDiyData.requestData("diy.php", {}, function(data){
	       			$scope.diyList = data;
	       			console.log(data);
	       		}, function(error){
	       			console.log(error)
	       		});


	       		$scope.carList = shopcarData.data;
	       		//添加购物车  添加之前，判断用户是否已经登录，登录后才能添加商品
	       		$scope.addShopcar = function(product){
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
	       }]);
})()