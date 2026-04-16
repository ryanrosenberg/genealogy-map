mapboxgl.accessToken = 'pk.eyJ1IjoicmJyMjk2IiwiYSI6ImNtbzBsN294dzA5NjYydHB5NTBhaGtuMTkifQ.QqdFAjf6XYSTRUA0QZLzdw';

const map = new mapboxgl.Map({
    container: 'map', 
    center: [-73.90868457, 40.65896597],
    zoom: 11,
    style: 'mapbox://styles/rbr296/cmo0luuhd005b01pcbzvoefsi'
});

const locations = [
    {
        "person": "Burt Rosenberg",
        "relation": "grandfather",
        "record_type": "Census",
        "year": 1950,
        "address": "519 Chester Street, Brooklyn",
        "raw": "40.65896596665618, -73.9086845739209",
        "lat": 40.659,
        "long": -73.9087
    },
    {
        "person": "Burt Rosenberg",
        "relation": "grandfather",
        "record_type": "Census",
        "year": 1940,
        "address": "519 Chester Street, Brooklyn",
        "raw": "40.65896596665618, -73.9086845739210",
        "lat": 40.659,
        "long": -73.9087
    },
    {
        "person": "Sarah Schildkraut",
        "relation": "great-grandmother",
        "record_type": "Census",
        "year": 1950,
        "address": "519 Chester Street, Brooklyn",
        "raw": "40.65896596665618, -73.9086845739211",
        "lat": 40.659,
        "long": -73.9087
    },
    {
        "person": "Sarah Schildkraut",
        "relation": "great-grandmother",
        "record_type": "Census",
        "year": 1940,
        "address": "519 Chester Street, Brooklyn",
        "raw": "40.65896596665618, -73.9086845739212",
        "lat": 40.659,
        "long": -73.9087
    },
    {
        "person": "Sarah Schildkraut",
        "relation": "great-grandmother",
        "record_type": "Census",
        "year": 1930,
        "address": "585 Quincy Street, Brooklyn",
        "raw": "40.688948811950326, -73.93589100275597",
        "lat": 40.6889,
        "long": -73.9359
    },
    {
        "person": "Sarah Schildkraut",
        "relation": "great-grandmother",
        "record_type": "Marriage",
        "year": 1929,
        "address": "473 Hancock Street, Brooklyn",
        "raw": "40.68435965954519, -73.93674354693663",
        "lat": 40.6844,
        "long": -73.9367,
        "link": "https://a860-historicalvitalrecords.nyc.gov/view/9546635"
    },
    {
        "person": "Sarah Schildkraut",
        "relation": "great-grandmother",
        "record_type": "State Census",
        "year": 1915,
        "address": "875 DeKalb Ave, Brooklyn",
        "raw": "40.692819897640355, -73.94157103159193",
        "lat": 40.6928,
        "long": -73.9416
    },
    {
        "person": "Sarah Schildkraut",
        "relation": "great-grandmother",
        "record_type": "Census",
        "year": 1910,
        "address": "182 M.L.K. Jr Place, Brooklyn",
        "raw": "40.69674935763328, -73.94719934508346",
        "lat": 40.6967,
        "long": -73.9472
    },
    {
        "person": "Sarah Schildkraut",
        "relation": "great-grandmother",
        "record_type": "Birth",
        "year": 1906,
        "address": "96 Lewis Street, Manhattan",
        "raw": "40.71578279174288, -73.97900171678303",
        "lat": 40.7158,
        "long": -73.979
    },
    {
        "person": "Louis Rosenberg",
        "relation": "great-grandfather",
        "record_type": "Census",
        "year": 1930,
        "address": "585 Quincy Street, Brooklyn",
        "raw": "40.688948811950326, -73.93589100275597",
        "lat": 40.6889,
        "long": -73.9359
    },
    {
        "person": "Louis Rosenberg",
        "relation": "great-grandfather",
        "record_type": "Marriage",
        "year": 1929,
        "address": "585 Quincy Street, Brooklyn",
        "raw": "40.688948811950326, -73.93589100275597",
        "lat": 40.6889,
        "long": -73.9359,
        "link": "https://a860-historicalvitalrecords.nyc.gov/view/9546635"
    },
    {
        "person": "Louis Rosenberg",
        "relation": "great-grandfather",
        "record_type": "State Census",
        "year": 1925,
        "address": "469 Marcy Ave, Brooklyn",
        "raw": "40.6996633882596, -73.9499334046084",
        "lat": 40.6997,
        "long": -73.9499
    },
    {
        "person": "Louis Rosenberg",
        "relation": "great-grandfather",
        "record_type": "Census",
        "year": 1920,
        "address": "204 Ellery Street, Brooklyn",
        "raw": "40.69884064585927, -73.94468279325417",
        "lat": 40.6988,
        "long": -73.9447
    },
    {
        "person": "Louis Rosenberg",
        "relation": "great-grandfather",
        "record_type": "State Census",
        "year": 1915,
        "address": "211 Stockton Street, Brooklyn",
        "raw": "40.6965919893498, -73.9465168315918",
        "lat": 40.6966,
        "long": -73.9465
    },
    {
        "person": "Louis Rosenberg",
        "relation": "great-grandfather",
        "record_type": "Census",
        "year": 1910,
        "address": "867 DeKalb Ave, Brooklyn",
        "raw": "40.69283179787215, -73.94177250859865",
        "lat": 40.6928,
        "long": -73.9418
    },
    {
        "person": "Louis Rosenberg",
        "relation": "great-grandfather",
        "record_type": "Birth",
        "year": 1908,
        "address": "226 Ellery Street, Brooklyn",
        "raw": "40.6991868558063, -73.94416757577227",
        "lat": 40.6992,
        "long": -73.9442,
        "link": "https://a860-historicalvitalrecords.nyc.gov/view/2009641"
    },
    {
        "person": "William Rosenberg",
        "relation": "great-great-grandfather",
        "record_type": "Marriage",
        "year": 1907,
        "address": "1066 Myrtle Ave, Brooklyn",
        "raw": "40.69670923848107, -73.93825244047494",
        "lat": 40.6967,
        "long": -73.9383,
        "link": "https://a860-historicalvitalrecords.nyc.gov/view/8151634"
    },
    {
        "person": "Eva Warshauer",
        "relation": "great-great-grandmother",
        "record_type": "Marriage",
        "year": 1907,
        "address": "1066 Myrtle Ave, Brooklyn",
        "raw": "40.69670923848107, -73.93825244047494",
        "lat": 40.6967,
        "long": -73.9383,
        "link": "https://a860-historicalvitalrecords.nyc.gov/view/8151634"
    }
];

// prompted Claude to add the popup and to do the hover effect and tweaked from there
const personColors = {
    "Burt Rosenberg (grandfather)":    "#cf876d",
    "Sarah Schildkraut (great-grandmother)": "#72abf1",
    "Louis Rosenberg (great-grandfather)":   "#64e6a7",
    "William Rosenberg (great-great-grandfather)": "#9B2AE0",
    "Eva Warshauer (great-great-grandmother)":     "#8f7c4a"
};

const markersByPerson = {};

locations.forEach(location => {
    const color = personColors[`${location.person} (${location.relation})`] || "#888888";

    // Outer wrapper — Mapbox controls transform on this, don't touch it
    const markerEl = document.createElement('div');
    markerEl.style.cssText = `width: 14px; height: 14px; cursor: pointer;`;

    // Inner dot — we animate this instead
    const dot = document.createElement('div');
    dot.style.cssText = `
        width: 20px;
        height: 20px;
        border-radius: 30%;
        background-color: ${color};
        border: 2px solid white;
        box-shadow: 0 1px 4px rgba(0,0,0,0.4);
        transition: transform 0.15s ease, opacity 0.15s ease;
    `;
    markerEl.appendChild(dot);

    if (!markersByPerson[location.person]) {
        markersByPerson[location.person] = [];
    }
    markersByPerson[location.person].push(dot); // store the dot, not the wrapper

    const popupHTML = `
        <div style="font-family: sans-serif; font-size: 13px; line-height: 1.5; max-width: 220px;">
            <strong style="font-size: 14px; color: ${color};">${location.person}</strong><br>
            <span style="color: #555;">${location.record_type}</span> &middot; ${location.year}<br>
            <span>${location.address}</span>
            ${location.link ? `<br><a href="${location.link}" target="_blank" style="color: #0070f3;">View document &rarr;</a>` : ''}
        </div>
    `;

    const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(popupHTML);

    new mapboxgl.Marker({ element: markerEl })
        .setLngLat([location.long, location.lat])
        .setPopup(popup)
        .addTo(map);

    markerEl.addEventListener('mouseenter', () => {
        Object.values(markersByPerson).flat().forEach(d => {
            d.style.opacity = '0.2';
            d.style.transform = 'scale(1)';
        });
        markersByPerson[location.person].forEach(d => {
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

// Add this after your personColors definition and before your locations.forEach
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

explainer.innerHTML = `
    <h1 style="margin: 0 0 6px; font-size: 15px; font-weight: 700; color: #111;">
        Ryan's Genealogy Map
    </h1>
    <p style="margin: 0 0 10px; font-size: 12px; color: #555; line-height: 1.5;">
        Click a marker to see record details. Hover to highlight all locations for that person.
    </p>
    <div style="display: flex; flex-direction: column; gap: 5px;">
        ${legend}
    </div>
`;

document.getElementById('map').appendChild(explainer);