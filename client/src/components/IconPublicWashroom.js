import L from 'leaflet';
// Icon for showing in location map for drinking fountains.
// https://stackoverflow.com/questions/47723812/custom-marker-icon-with-react-leaflet
const IconPublicWashroom = new L.Icon({
  iconUrl: require('../assets/public-washroom.svg'),
  iconRetinaUrl: null,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(32, 32),
  // className: 'leaflet-div-icon'
});

export { IconPublicWashroom };
