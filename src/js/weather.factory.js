(function() {
    'use strict';

    angular
        .module('weatherApp')
        .factory('weatherFactory', weatherFactory);

    weatherFactory.$inject = ['$http', '$q', 'keys'];

    /* @ngInject */
    function weatherFactory($http, $q, keys) {
        var service = {
            getCityWeather: getCityWeather
        };
        return service;

        ////////////////
        // Get weather data from openweathermap.org API
        function getCityWeather(city) {
            var defer = $q.defer();
        	$http.get('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&APPID=' + keys.weather).then(
                function(response) {
                    console.log(response);
                    if (response.data.cod !== 200) {
                        defer.reject(response.data.message);
                    }
                        defer.resolve(response.data);
                },
                function(error) {
                    console.log(error);
                    if (error.status === -1) {
                        defer.reject("An unexpected error has occured.");
                    }
                }
            ); 
        	return defer.promise;
        }
    }
})();


