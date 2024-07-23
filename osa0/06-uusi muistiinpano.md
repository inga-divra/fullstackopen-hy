```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: Käyttäjä kirjoittaa tekstin tekstikenttään ja painaa 'Save'-näppäintä

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: Pyyntö sisältää JSON-muotoisen uuden muistiinpanon, johon kuuluu sekä sisältö (content) että aikaleima (date):
    {
      content: "SPA",
      date: "2024-07-23T16:10:43.687Z"
    }
    Note right of browser: Pyyntöön liitetty headeri Content-Type kertoo palvelimelle, että data on JSON-muotoista
    
    Note right of server: Palvelin tallentaa uuden muistiinpanon tietokantaan
    server-->>browser: Vastauksessa/Response {"message":"note created"}
    deactivate server

    Note right of browser: Selain pysyy samalla sivulla ja päivittää muistiinpanon listan ilman sivun uudelleenlatausta

```
