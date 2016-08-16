(function() {
    'use strict';

    angular
        .module('weatherApp')
        .factory('weatherFactory', weatherFactory);

    weatherFactory.$inject = ['$http'];

    /* @ngInject */
    function weatherFactory($http) {
        var service = {
            getCityWeather: getCityWeather
        };
        return service;

        ////////////////
        // Get weather data from openweathermap.org API
        function getCityWeather(city) {
        	var promise = $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=2e688cdfc7121a9f0558324b8e519443'); 
        	return promise;
        }
    }
})();