cloudStbApp.factory('data', [ '$http', '$q', 'WEBSERVICE_CONFIG', function ($http, $q, WEBSERVICE_CONFIG) {

  // Following function gives all channels
  function getChannelList () {
    //Set the URL path
    var _url = WEBSERVICE_CONFIG.SERVER_URL + '/epg/channels?user=rovi';

    // $http returns a promise for the url data
    return $http({method: 'GET', url: _url});
  }

  // Following function gives program info for every channel - NOT USED NOW
  function getProgramInfo (urlList) {
    var deferred = $q.defer();

    // Fire all http calls
    $q.all(urlList.map(function (_url) {
      return $http({method: 'GET', url: _url});
    })).then(function (results) {   
      deferred.resolve(results);
    });

    return deferred.promise;
  }

  // Fetches Program Data for a particular channel based on start and end time
  function getProgramList(sourceID) {
      /*
      * Hard coding for now but userStartTime and userEndTime will be variable in local time zone
      *
      * var dt = new Date();
      * var utcUserStartTime = dt.toISOString();
      *
      * var endTime = new Date();
      * endTime.setHours(23, 59, 59, 999);
      * var utcUserEndTime = endTime.toISOString();
      *
      * console.log(utcUserEndTime.toISOString());
      * */

      //var startEndTime = datetime.UTCLocalTimeConversion();

      // Replace hard coded value with the properties in 'startEndTime' object
      var userStartTime = '2015-06-15T08:00:00Z',
          userEndTime = '2015-06-15T20:30:00Z';

      var _url = WEBSERVICE_CONFIG.SERVER_URL + '/epg/programs?user=rovi&sourceId=' + sourceID + '&userStartTime=' + userStartTime + '&userEndTime=' + userEndTime;

      return $http({method: 'GET', url: _url});
  }

  return {
    getChannelList: getChannelList,
    getProgramList: getProgramList,
    getProgramInfo: getProgramInfo
  }

}]);