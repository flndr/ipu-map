# IPU Mitarbeiter-Karte

tbd.


## Notes

### Geocoding Box


#### Nominatim für Bayern starten

Quellen müssen angepasst werden:
https://download.geofabrik.de/index.html


```
docker run -it --rm \
-e PBF_URL=https://download.geofabrik.de/europe/germany/bayern/mittelfranken-latest.osm.pbf \
-e REPLICATION_URL=https://download.geofabrik.de/europe/germany/bayern/mittelfranken-updates/ \
-p 8080:8080 \
--name nominatim \
mediagis/nominatim:4.0
```

Container nicht schnell wegwerfen
```
Deutschland    3,6GB
Bayern         0,7GB
Mittelfranken  0,1GB --> Build Time 15min!
```
