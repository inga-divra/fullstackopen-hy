```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Käyttäjä kirjoittaa tekstin tekstikentään ja painaa 'Save'-näppäintä

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of server: Palvelin tallentaa uuden muistiinpanon tietokantaan
    server-->>browser: Vastauksessa (Response) pitäisi olla vastaava viesti JSON-muodossa, mutta tätä tehtävää tehtäessä sain vain seuraavan viestin Response-ssa: "Failed to load response data: No content available because this request was redirected"
    deactivate server

    Note right of browser: Selain saa vastauksen palvelimelta ja päivittää muistiinpanon listan

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document (notes)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file (main.css)
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JS file (main.js)
    deactivate server

    Note right of browser: Selain alkaa suorittaa JS-koodia, joka hakee JSON-datan palvelimelta

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [
        {
            "content": "hola",
            "date": "2024-07-23T11:08:32.635Z"
        },
        {
            "content": "ey",
            "date": "2024-07-23T11:08:55.119Z"
        },
        ... ]
    deactivate server

    Note right of browser: Selain suorittaa callback-function, joka renderöi muistiinpanot
