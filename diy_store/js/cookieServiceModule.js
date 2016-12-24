(function(){
	angular.module("cookieServiceModule", [])
	       .service("cookieService", ["$window", function($window) {
	       		//将用户信息存入浏览器缓存：COOKIE：使用document对象（原生对象）
	       		// 							Local Storage：在angularjs中需要使用原生对象时，可注入“$window”,使用$window.documnet

	       		/**
				 * 设置cookie
				 * @param string  key     cookie的键
				 * @param mixed   value   cookie的值
				 * @param date	  expires cookie的有效期		默认值0 浏览器关闭失效
				 * @param string  path	  cookie的有效路径      默认值当前路径
				 * @param string  domain  cookie的有效域名      默认当前域名
				 * @param boolean secure  是否只在https下起作用 默认false
				*/
				this.setCookie = function(key, value, expires, path, domain, secure){
					var expires_string = "";
					if (expires !== undefined) {
						expires_string = ";expires="+expires.toUTCString();
					}

					var path_string = "";
					if (path !== undefined) {
						path_string = ";path="+path;
					}

					var domain_string = "";
					if (domain !== undefined) {
						domain_string = ";domain="+domain;
					}

					var secure_string = "";
					if (secure !== false) {
						secure_string = ";true";
					}

					$window.document.cookie = key+"="+value+expires_string+path_string+domain_string+secure_string;
				}



				/**
				 * 读取cookie
				 * @param string key cookie的键
				 * @return string value cookie的值
				*/
				this.getCookie = function(key) {
					var cookie_list = $window.document.cookie.split("; ");

					for (var i in cookie_list) {
						var cookie_item = cookie_list[i].split("=");

						if (cookie_item[0] === key) {
							return cookie_item[1];
						}
					}
				},


				/**
				 * 删除cookie
				 * @param string key cookie的键
				 * @param string path  cookie的有效路径
				*/
				this.deleteCookie = function(key ,path){
					var path_string = undefined;
					if (path !== undefined) {
						path_string = ";path="+path;
					}

					var date = new Date();
					date.setTime(date.getTime() - 1);

					this.setCookie(key, "", date, path_string)

				}
	       }])
})()