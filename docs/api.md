
# API

## /api/getUsers

* **Method:**

  `GET`
  
* **Header**  

  * Token: access token 
  * UserId: user id 
  
*  **URL Params**

   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:** 
    ```
    { 
        error: null, 
        data: [
              {
                  "id": "123abc123",
                  "username": "ILovePspice",
                  "password": "justinBeiber123",
                  "email": "haruvioved@gmail.com",
                  "firstname": "Oved Hagai",
                  "lastname": "Haruvi"
              },
              {
                  "id": "1234abc1234",
                  "username": "ManchesterUnited4Life",
                  "password": "fantasyfootball",
                  "email": "doroknkopit@gmail.com",
                  "firstname": "Doron",
                  "lastname": "Kopit"

              },
        ]
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : null, data: null }`
