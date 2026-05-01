mapboxgl.accessToken = 'pk.eyJ1IjoicmJyMjk2IiwiYSI6ImNtbzBsN294dzA5NjYydHB5NTBhaGtuMTkifQ.QqdFAjf6XYSTRUA0QZLzdw';

const map = new mapboxgl.Map({
    container: 'map', 
    center: [-73.90868457, 40.65896597],
    zoom: 11,
    style: 'mapbox://styles/rbr296/cmo0luuhd005b01pcbzvoefsi'
});

// prompted Claude to add the popup and to do the hover effect and tweaked from there
const personColors = {
    "Burt Rosenberg (grandfather)":    "#cf876d",
    "Sarah Schildkraut (great-grandmother)": "#72abf1",
    "Louis Rosenberg (great-grandfather)":   "#64e6a7",
    "William Rosenberg (great-great-grandfather)": "#9B2AE0",
    "Eva Warshauer (great-great-grandmother)":     "#8f7c4a"
};

// SVG icons for each record type (rendered white, sized to fit inside the marker)
const recordTypeIcons = {
    "Birth": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Star: birth/arrival -->
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>`,
    "Marriage": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="11" height="11" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <!-- Heart: marriage -->
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>`,
    "Death": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="11" height="11" fill="white" stroke="none">
        <!-- Star of David: two overlapping triangles -->
        <polygon points="12,2 22,19 2,19"/>
        <polygon points="12,22 2,5 22,5"/>
    </svg>`,
    "Census": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Document/list: census -->
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <line x1="9" y1="7" x2="15" y2="7"/>
        <line x1="9" y1="11" x2="15" y2="11"/>
        <line x1="9" y1="15" x2="13" y2="15"/>
    </svg>`,
    "State Census": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <!-- Document/list: census -->
        <rect x="5" y="2" width="14" height="20" rx="2"/>
        <line x1="9" y1="7" x2="15" y2="7"/>
        <line x1="9" y1="11" x2="15" y2="11"/>
        <line x1="9" y1="15" x2="13" y2="15"/>
    </svg>`,
};

const recordTypeIconLabels = {
    "Birth":        "★ Birth",
    "Marriage":     "♥ Marriage",
    "Death":        "✝ Death",
    "Census":       "≡ Census or State Census",
    "State Census": "≡ Census or State Census",
};

// Document links keyed by "person|record_type|year" since the GeoJSON doesn't carry them
const documentLinks = {
    "Sarah Schildkraut|Marriage|1929": "https://a860-historicalvitalrecords.nyc.gov/view/9546635",
    "Louis Rosenberg|Marriage|1929":   "https://a860-historicalvitalrecords.nyc.gov/view/9546635",
    "Louis Rosenberg|Birth|1908":      "https://a860-historicalvitalrecords.nyc.gov/view/2009641",
    "William Rosenberg|Marriage|1907": "https://a860-historicalvitalrecords.nyc.gov/view/8151634",
    "Eva Warshauer|Marriage|1907":     "https://a860-historicalvitalrecords.nyc.gov/view/8151634"
};

function initMarkers(geojson) {
    const markersByPerson = {};

    geojson.features.forEach(feature => {
        const { person, relation, record_type, year, address } = feature.properties;
        const [lng, lat] = feature.geometry.coordinates;

        const linkKey = `${person}|${record_type}|${year}`;
        const link = documentLinks[linkKey] || null;

        const color = personColors[`${person} (${relation})`] || "#888888";

        // Outer wrapper — Mapbox controls transform on this, don't touch it
        const markerEl = document.createElement('div');
        markerEl.style.cssText = `width: 14px; height: 14px; cursor: pointer;`;

        // Inner dot — we animate this instead
        const dot = document.createElement('div');
        dot.style.cssText = `
            width: 22px;
            height: 22px;
            border-radius: 30%;
            background-color: ${color};
            border: 2px solid white;
            box-shadow: 0 1px 4px rgba(0,0,0,0.4);
            transition: transform 0.15s ease, opacity 0.15s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        const icon = recordTypeIcons[record_type] || recordTypeIcons["Census"];
        dot.innerHTML = icon;
        markerEl.appendChild(dot);

        if (!markersByPerson[person]) {
            markersByPerson[person] = [];
        }
        markersByPerson[person].push(dot); // store the dot, not the wrapper

        const popupHTML = `
            <div style="font-family: sans-serif; font-size: 13px; line-height: 1.5; max-width: 220px;">
                <strong style="font-size: 14px; color: ${color};">${person}</strong><br>
                <span style="color: #555;">${record_type}</span> &middot; ${year}<br>
                <span>${address}</span>
                ${link ? `<br><a href="${link}" target="_blank" style="color: #0070f3;">View document &rarr;</a>` : ''}
            </div>
        `;

        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML);

        new mapboxgl.Marker({ element: markerEl })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(map);

        markerEl.addEventListener('mouseenter', () => {
            Object.values(markersByPerson).flat().forEach(d => {
                d.style.opacity = '0.2';
                d.style.transform = 'scale(1)';
            });
            markersByPerson[person].forEach(d => {
                d.style.opacity = '1';
                d.style.transform = 'scale(1.2)';
            });
        });

        markerEl.addEventListener('mouseleave', () => {
            Object.values(markersByPerson).flat().forEach(d => {
                d.style.opacity = '1';
                d.style.transform = 'scale(1)';
            });
        });
    });
}

// Add legend/explainer panel
const explainer = document.createElement('div');
explainer.id = 'explainer';
explainer.style.cssText = `
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1;
    background: white;
    border-radius: 8px;
    padding: 12px 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    max-width: 280px;
    font-family: sans-serif;
`;

const legend = Object.entries(personColors).map(([name, color]) => `
    <div style="display: flex; align-items: center; gap: 8px;">
        <div style="
            width: 12px; height: 12px;
            border-radius: 50%;
            background: ${color};
            border: 2px solid white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            flex-shrink: 0;
        "></div>
        <span style="font-size: 12px; color: #333;">${name}</span>
    </div>
`).join('');

const iconLegend = Object.entries(recordTypeIconLabels).map(([type, label]) => 
    type == "State Census" ? '' :
    `
    <div style="display: flex; align-items: center; gap: 8px;">
        <div style="
            width: 18px; height: 18px;
            border-radius: 4px;
            background: #666;
            border: 2px solid white;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
            flex-shrink: 0;
            display: flex; align-items: center; justify-content: center;
        ">${recordTypeIcons[type] || ''}</div>
        <span style="font-size: 12px; color: #333;">${type}</span>
    </div>
`).join('');

explainer.innerHTML = `
    <h1 style="margin: 0 0 6px; font-size: 15px; font-weight: 700; color: #111;">
        Ryan's Genealogy Map
    </h1>
    <p style="font-size: 12px; color: #111; line-height: 1.5; font-style: normal;">
        This map shows the history of my father's family in New York City in the first half of the 20th century -- or as much as can be gleaned from official records. Births, deaths, marriages, and censuses are all tracked for the narrow slices of Brooklyn and Manhattan where they lived.
    </p>
    <p style="margin: 0 0 10px; font-size: 12px; color: #555; line-height: 1.5;">
        Click a marker to see record details. Hover to highlight all locations for that person.
    </p>
    <div style="display: flex; flex-direction: column; gap: 5px; margin-bottom: 10px;">
        ${legend}
    </div>
    <div style="border-top: 1px solid #eee; padding-top: 8px; margin-top: 2px;">
        <p style="margin: 0 0 6px; font-size: 11px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 0.05em;">Record type</p>
        <div style="display: flex; flex-direction: column; gap: 5px;">
            ${iconLegend}
        </div>
    </div>
`;

document.getElementById('map').appendChild(explainer);

// Load GeoJSON and initialize markers
fetch('output.geojson')
    .then(res => {
        if (!res.ok) throw new Error(`Failed to load output.geojson: ${res.status}`);
        return res.json();
    })
    .then(geojson => initMarkers(geojson))
    .catch(err => console.error(err));