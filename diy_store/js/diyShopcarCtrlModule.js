(function(){
	angular.module("diyShopcarModule",[])
		   .controller("diyShopcarCtrl",["$scope","shopcarData","IMAGEPATH",function($scope,shopcarData,IMAGEPATH){
		   			$scope.IMAGEPATH = IMAGEPATH;
		   			$scope.carList = shopcarData.data;
		   			//购物车 增加数量
		       		$scope.addShopcarNum = function(id){
		       			$scope.carList[id].shopcar_num ++;
		       		}

		       		//购物车减少数量
		       		$scope.minusShopcarNum = function(id){
		       			if ($scope.carList[id].shopcar_num <= 1) {
		       				$("#minusBtn"+id).tooltip("show");
		       				return;
		       			}
		       			$scope.carList[id].shopcar_num --;

		       		}

		       		//删除购物车中的商品
		       		$scope.deleteShopcar = function(id){
		       			delete $scope.carList[id];
		       		}
		       		
		   }])
})()