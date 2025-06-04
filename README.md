# Gästapplikation – REST Restaurant

Detta är frontend-applikationen för besökare till **REST Restaurant**. Gränssnittet gör det möjligt för gäster att:

- Bläddra i menyn
- Boka bord
- Skicka meddelanden till restaurangen via kontaktformulär

Applikationen kommunicerar direkt med backend-tjänsten via ett RESTful API.

---

## Kommunikation med REST-API:t

All data som visas eller skickas i frontend hämtas/asynkront skickas till backend via HTTP-anrop med `fetch()`.

### Meny

- **GET /api/menu**  
  Används för att hämta restaurangens aktuella meny (mat och dryck).
- Menyn visas i olika kategorier baserat på fältet `category`.

### Bordsbokning

- **POST /api/bookings**  
  Gäster fyller i namn, e-post, antal gäster, datum och tid. Bokningen skickas till backend där den sparas i databasen.
- Frontend visar ett bekräftelsemeddelande vid lyckad bokning eller felmeddelande om något saknas.

### Kontaktformulär

- **POST /api/messages**  
  Gäster kan skicka meddelanden till restaurangen (t.ex. frågor eller feedback). Dessa lagras i databasen via API:t.
- Felhantering hanteras på klientsidan och visas i gränssnittet.

---

## Teknik i korthet

- **Angular HttpClient** används för alla HTTP-anrop till backend-API:t
- **JSON** används som dataformat för både in- och utgående data
- Formulärdata valideras på klientsidan innan det skickas
- Backend-svar hanteras dynamiskt för att visa rätt feedback till användaren
- Felhantering (t.ex. `HttpErrorResponse`) fångas med `catchError` och visas för användaren
