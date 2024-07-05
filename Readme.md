Backend Project System design using Node.js and Mongodb.
# Flow Distribution API

## Endpoints

### Toggle Top Astrologer Status
- **URL:** `/astrologers/:id/toggle-top`
- **Method:** `PUT`
- **Description:** Toggles the top astrologer status for the given astrologer.
- **Request Parameters:**
  - `id` (String): The ID of the astrologer.
- **Response:**
  - `200 OK`: Returns the updated astrologer.
  - `500 Internal Server Error`: Error message.

### Distribute Users to Astrologers
- **URL:** `/astrologers/distribute`
- **Method:** `POST`
- **Description:** Distributes users to astrologers based on the flow distribution algorithm.
- **Request Body:**
  - `users` (Array): List of users to be distributed.
- **Response:**
  - `200 OK`: Returns the list of users with their connected astrologers.
  - `500 Internal Server Error`: Error message.

## Algorithm
The flow distribution algorithm ensures that users are distributed evenly among astrologers, with the ability to adjust flow for top astrologers. Top astrologers can receive an increased or decreased proportion of users based on a predefined adjustment factor.

## Example Request
```bash
curl -X POST -H "Content-Type: application/json" -d '{"users": [{"name": "User1"}, {"name": "User2"}]}' http://localhost:3000/astrologers/distribute
# Backend
