import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import Stamen from 'ol/source/Stamen';
import KML from 'ol/format/KML';
import {fromLonLat} from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import {Vector as VectorLayer} from 'ol/layer';


let kmlLayer = new VectorLayer({
  source: new VectorSource({
    url: './TestLiergues.kml',
    format: new KML()
  })
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
  ],
  view: new View({
    center: fromLonLat([4.663223,45.9704547]),
    zoom: 15
  })
});