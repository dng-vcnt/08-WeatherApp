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

        ////////////////


        function addHistory() {
        	// Push to search history
        	vm.cityHistory.push({
        		"name": vm.cityData.data.name,
        		"time": Date.now() 
        	});
        }

        function getWeather(city) {
        	// Adjust search city parameter
        	city = city.toLowerCase();

        	// Get $http data from server
        	var promise = weatherFactory.getCityWeather(city);
        	promise.then(
        		function(data) {
        			// Upon success
        			vm.cityData = data;
        			addHistory();
                    console.log(vm.cityData);
                    if (vm.cityData.data.name == null){ 
                        toastr.error("vm.cityData.data.message", "vm.cityData.data.cod");
                    } else {
                        toastr.success("Data Received!", "Congratulations!");
                    }
        		},
        		function(err){
        			// Upon error
        			toastr.error("Something went wrong.", "Oh noes!");
        		}
        	);	
        }
    }
})();