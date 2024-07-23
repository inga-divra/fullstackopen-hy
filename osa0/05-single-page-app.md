```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document (spa)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file (main.css)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JS file (spa.js)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: the JSON file (data.json) [{"content": "asd", "date": "2024-07-23T12:46:19.050Z"}, {"content": "Hola#", "date": "2024-07-23T12:46:27.066Z"}, ...]
    deactivate server

    Note right of browser: Selain alkaa suorittaa JS-koodia, joka hakee JSON-datan palvelimelta ja renderöi muistiinpanot
