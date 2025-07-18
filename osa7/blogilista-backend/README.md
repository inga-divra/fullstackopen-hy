# Tehtävät 4.1.-4.2.

## Tehtävä 4.1. Blogilista, Step 1

Tässä tehtävässä rakennamme yksinkertaisen blogilistasovelluksen, jossa käyttäjät voivat lisätä ja näyttää blogeja. Sovelluksessa talletetaan seuraavat tiedot:

- Kirjoittaja (author)
- Aihe (title)
- URL
- Äänet (likes)

Sovelluksen tulee tukea seuraavia toimintoja:

- **GET /api/blogs** - Listaa kaikki blogit.
- **POST /api/blogs** - Lisää uusi blogi.

### Vaiheet:

1. Luo sovelluksesta toimiva npm-projekti.
2. Konfiguroi sovellus suoritettavaksi komennolla `node --watch`.
3. Käytä MongoDB Atlasia tietokannan isännöintiin.
4. Testaa sovellusta Postmanilla tai VS Code REST Clientilla.

---

## Tehtävä 4.2. Blogilista, Step 2

Jaa sovelluksen koodi useisiin osiin ja moduuleihin. Etene pienin askelin ja varmista, että kaikki toimii koko ajan.
