(function() {
    'use strict';

    angular
        .module('weatherApp')
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['weatherFactory', 'toastr'];

    /* @ngInject */
    function WeatherController(weatherFactory, toastr) {
        var vm = this;
        vm.title = 'WeatherController';

        vm.cityData;
        // Create Object In Array
        vm.cityHistory = [];
        vm.addHistory = addHistory;
        vm.getWeather = getWeather;

        activate();

        ////////////////

        function activate() {

        }
        // Create Push Function
        function addHistory() {

        	vm.cityHistory.push({
        		"name": vm.cityData.data.name,
        		"time": Date.now() 
        	});
        }

        function getWeather(city) {
        	city = city.toLowerCase();
        	console.log(city);
        	var promise = weatherFactory.getCityWeather(city);
        	promise.then(
        		function(data) {
        			vm.cityData = data;
        			addHistory();
        			toastr.success("Data Received!", "Congratulations!");
        			console.log(vm.cityData.data.weather);
        		},
        		function(err){
        			toastr.danger("Something went wrong.", "Oh noes!");
        		}
        	);	
        }
    }
})();