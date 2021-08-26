import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import Stamen from 'ol/source/Stamen';

new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new Stamen({layer: 'watercolor'}),
    }),
    new TileLayer({
      source: new Stamen({layer: 'toner-labels'}),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});