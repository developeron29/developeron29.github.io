var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

function initAutocomplete() {

}

function fillInAddress() {
    var place = autocomplete.getPlace();
    console.log('place', place);
}

function setbounds() {
    autocomplete = new google.maps.places.Autocomplete(
        (document.getElementById('autocomplete')),
        {
            types:['geocode']
        }
    );

    autocomplete.addListener('place_changed', fillInAddress);
    var geolocation = {
        lat: 47.649019,
        lng: -122.347977
    };
    var circle = new google.maps.Circle({
        center: geolocation,
        radius: 10
    });
    autocomplete.setBounds(circle.getBounds());
}