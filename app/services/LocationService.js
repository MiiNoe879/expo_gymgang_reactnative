import ObservableListStore from '../../utils/Store';

class LocationService {
  static fetchLocationData() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('latitude', position.coords.latitude);
        console.log('longitude', position.coords.longitude);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `http://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true`;

        fetch(url)
          .then((response) => response.json())
          .then((response) => {
            const city = response.results[0].address_components[2].long_name;
            const country = response.results[0].address_components[5].long_name;
            const country_code = response.results[0].address_components[5].short_name;
            const region = response.results[0].address_components[4].long_name;
            const coordinates = {
              countryName: country,
              countryCode: country_code,
              regionName: region,
              city: city
            };
            ObservableListStore.setCoordinates(coordinates);
          });
      }

    );
  }

}

module.exports = LocationService;
