# IPU Mitarbeiter-Karte

WORK IN PROGRESS

## Todo

- Define/finish UI
- Prod-Builds / Pipeline
- Containerize Nominatim
- Tell UI why MAs were skipped (error handling)
- Deployment
- Authorization (ISO intranet?)

Nice to have

- Validate parsed Excel data
- Excel-Export (?)
- Open location in GoogleMaps / AppleMaps

Once there are much(!) more entries

- Move cache to persistent DB
- Only fetch changed/new entries on import

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
