(function(){
	angular.module("orderModule",[])
		   .controller("diyOrderCtrl",["$scope","shopcarData","IMAGEPATH","$httpParamSerializer","orderModelService","cookieService","$ionicPopup","$timeout",function($scope,shopcarData,IMAGEPATH,$httpParamSerializer,orderModelService,cookieService,$ionicPopup,$timeout){
				//一个提示对话框
				$scope.showAlert = function(tit,tem) {
				    var alertPopup = $ionicPopup.alert({
				       title: tit,
				       template: tem
				    });
				     alertPopup.then(function(res) {
				     
				    });
				};


				$scope.IMAGEPATH = IMAGEPATH;
				//获取购物车的数据
		   		$scope.carList = shopcarData.data;
		   		//获取用户id
		   		$scope.userId = cookieService.getCookie('users_id');
		   		console.log($scope.carList);
		   		console.log($scope.userId);

		   		$scope.doOrder = function(){
		   			if($scope.address && $scope.name && $scope.phone && $scope.info){

		   			}else{
		   				$scope.showAlert("朵拉提示","请补全收货信息");
		   				return;
		   			}
					orderModelService.orderUser("order.php",$httpParamSerializer({
		   				"orderDetails":$scope.carList, //参数orders:json(购物车的数据)是转化为Json字符串的（购物车内的信息）	     
						"address":$scope.address,
						"name": $scope.name,
						"phone":$scope.phone,
						"info":$scope.info,
						"userId": $scope.userId
				   	}),function(res){
						if(res.data.code === 2){
							$scope.showAlert("朵拉提示","订单添加失败");
						}else{
							$scope.showAlert("朵拉提示","订单添加成功");
						}
				   	},function(){
				   		$scope.showAlert("朵拉提示","订单添加失败");
				   	})

		   		}
		   }])
})()