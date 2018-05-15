# Welcome to Be Safe!
Keywords: Safety, reliability, friendliness.

## Datasets Description

### Data sets used:
- **Neighborhood Names GIS:** Names, location and a basic information of the neighborhoods in New York. https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json'
- **NY Districts geoshapes:** Shapes of districts of New York with theirs Borough numbers and District numbers. https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson
- **Crimes in NY:** Complaint data historic that includes all valid felony, misdemeanor, and violation crimes reported to the New York City Police Department from 2006 to 2016.
 https://data.cityofnewyork.us/resource/9s4h-37hy.json
- **Housing New York Units by Building:**  Reports on buildings, units and projects that began after January 1, 2014 registered on the Housing New York plan. https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json

### Other information:
-   Do you use the primary dataset ”online climate data” from data.gov? **No**
-  Are all these datasets from data.gov or data.indy.gov? If not, where are they coming from (links)?  **No, the *NY districts geoshapes* dataset are from the ArcGIS API**

## Brief description
*Be Safe!* plataform presents an approach to the solution of the codehacks's problem, offering a solution to the new students of the NYU Stern School to find the best area to live based on safety, affordability and closeness.

In the second phase, the Kanban Methodology was used in order to specify the main tasks that would be carry out in this lapse of time to the technological, analytical and visualization requirements. So, Bootstrap, jQuery and Google Maps API libraries were used to make a map with the main locations was created and a first version of a navigation bar that allows access to the first functions developed.

For the analytical requeriments, the data of the four main data bases was obteined, and the districts and neighborhoods of New York was extracted from them. And, for this stage, the user can filter the content of your search by distance of the closest district.

By last, the application shows, with different colors, the 59 districts on a map provided by Google Maps grouped by boroughs each time that them are selected in the navigation bar for the search. The neighborhoods and the buildings, units and projects that there are in New York are showed too. And a better approach of a friendly user font-end UI, as support to move forward with the visualization requeriments.

## Structured description:

#### Map Visualization:

 1. Basic Map with specific location (your map is located in a meaningful place). **Yes**
 2. Markers for location of interest places **Yes**
 3. Labels for interest places names **No**
 4. Window to show detail information of a interest place **No**
 5. [Describe] Any other cover on the map (for example, cloud cover to show the weather effect) **No**

#### Chart Visualization:

1. [Describe] Use Graph? What is the type? (bar chart, pie chart, radar chart ...) **No**
2. [List] Any interaction available on the graph? List them (enable click on numbers, drag on lines, change time/variables...) **No**

#### Interaction Form:
1. [List] Any information output? list them. (text field, text area, label, plain HTML ...) **No**
2. [List] Any operation option (filters)? **No**
3. [List] Any information input? **No**
4. [List] Interaction with Map? **The user can see the districts grouped by borough, and make a search based in the minimum distance to the NYU Stern School.**
5. [List] Interaction with data visualization? List them. **No**

##  Build Case  
How can we build and access your project on a Linux/Unix machine if you use external dependencies besides HTML/CSS/Javascript?

> The project don't use any external dependencie, only the libraries
> before mentionated, but their are imported automatically online.

List the dependencies you used, such as python, node.js, etc.  
> - Bootstrap
> - jQuery
> - Google Maps API
> - d3.js

List the steps we should follow to build the project.
> 1. Open the main page (index.html) in your explorer.
> 2. Enjoy it!

## Test Case    

The project was tested in the next browsers:
 - Google Chrome
 - Firefox
 - Safari

## Additional Information    
