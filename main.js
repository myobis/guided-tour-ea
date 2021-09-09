import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import Stamen from 'ol/source/Stamen';
import KML from 'ol/format/KML';
import {fromLonLat} from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import {Vector as VectorLayer} from 'ol/layer';
import Feature from 'ol/Feature';
import {Icon, Style} from 'ol/style';
import Point from 'ol/geom/Point';
import Geolocation from 'ol/Geolocation';


let myView = new View({
  center: fromLonLat([4.663223,45.9704547]),
  zoom: 15
});


let kmlLayer = new VectorLayer({
  source: new VectorSource({
    url: './20210903-080251 - Balade du chien 3 septembre 2021 - Nettoyée.kml',
    format: new KML()
  })
});


const positionFeature = new Feature({
  geometry: new Point(fromLonLat([4.663223,45.9704547])),
  name: 'Vous êtes ici',
});
const positionStyle = new Style({
  image: new Icon({
    src: 'blueArrow.png',
    rotateWithView: true,
    scale: 0.3,
    rotation: 45 * Math.PI / 180,
  }),
});
positionFeature.setStyle(positionStyle);
const positionSource = new VectorSource({
  features: [positionFeature],
});
const positionLayer = new VectorLayer({
  source: positionSource,
});

const geolocation = new Geolocation({
  // enableHighAccuracy must be set to true to have the heading value.
  trackingOptions: {
    enableHighAccuracy: true,
  },
  projection: myView.getProjection(),
});
geolocation.setTracking(true);
geolocation.on('change:position', function () {
  const coordinates = geolocation.getPosition();
  positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
});
geolocation.on('change:heading', function () {
  const heading = geolocation.getHeading();
  positionStyle.getImage().setRotation(heading);
});

new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new Stamen({layer: 'watercolor'}),
    }),
    //new TileLayer({ source: new Stamen({layer: 'terrain-lines'}), }),
    kmlLayer,
    new TileLayer({
      source: new Stamen({layer: 'toner-labels'}),
    }),
    positionLayer,
  ],
  view: myView
});