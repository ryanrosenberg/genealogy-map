# Small script to convert Javascript object to GeoJSON

library(jsonlite)
library(tidyverse)
library(sf)

df <- read_json('scratch.json') %>%
  transpose() %>%
  as_tibble() %>%
  unnest(everything()) %>%
  st_as_sf(coords = c("long", "lat"))

df %>%
  leaflet() %>%
  addTiles() %>%
  addMarkers()

st_write(df, "output.geojson", driver = "GeoJSON")
