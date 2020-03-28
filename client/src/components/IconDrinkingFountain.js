import L from 'leaflet';
// Icon for showing in location map for drinking fountains.
// https://stackoverflow.com/questions/47723812/custom-marker-icon-with-react-leaflet
const IconDrinkingFountain = new L.Icon({
  iconUrl: require('../assets/drinking-fountain.svg'),
  iconRetinaUrl: null,
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  // iconSize: new L.Point(48, 48),
  // className: 'leaflet-div-icon'
});

export { IconDrinkingFountain };
