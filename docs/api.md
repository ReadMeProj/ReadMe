
# API

## /api/getUsers

* **Method:**

  `GET`
  
* **Header**  

  * Token: access token 
  * UserId: user id 
  
*  **URL Params**

   * None

* **Data Params**

   * None

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

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : ..., data: null }`
    **Causes:** Missing data in header
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : ..., data: null }`
    **Causes:** Access token outdated
    
## /api/getUser/{$id}

* **Method:**

  `GET`
  
* **Header**  

  * Token: access token 
  * UserId: user id 
  
*  **URL Params**

   * id: string

* **Data Params**

   * None

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:** 
    ```
    { 
        error: null, 
        data: 
              {
                  "id": "123abc123",
                  "username": "ILovePspice",
                  "password": "justinBeiber123",
                  "email": "haruvioved@gmail.com",
                  "firstname": "Oved Hagai",
                  "lastname": "Haruvi"
              },   
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
  **Content:** `{ error : ..., data: null }`
  **Causes:** Missing data in header
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : ..., data: null }`
    **Causes:** Access token outdated
    
## /api/getArticles

* **Method:**

  `GET`
  
* **Header**  

  * Token: access token 
  * UserId: user id 
  
*  **URL Params**

   * None

* **Data Params**

   * None

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:** 
    ```
    { 
        error: null, 
        data: [
              {
                  "id": "abdefghijk12345",
                  "name": "At India’s Funeral Pyres, Covid Sunders the Rites of Grief",
                  "url": "https://www.nytimes.com/2021/05/08/world/asia/india-covid-deaths-crematories.html",
                  "author": "By Mujib Mashal, Sameer Yasir, Shalini Venugopal Bhagat and Atul Loke",
                  "date": "20210508"
              },
              {
                  "id": "abdefghijk1234567",
                  "name": "Chinese rocket expected to crash into Earth this weekend",
                  "url": "https://www.cnn.com/2021/05/08/politics/chinese-rocket-earth-reentry/index.html",
                  "author": "Paul LeBlanc, CNN",
                  "date": "2021-05-08T04:01:55Z"
              },
        ]
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ error : ..., data: null }`
    **Causes:** Missing data in header
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : ..., data: null }`
    **Causes:** Access token outdated

## /api/getArticle/{$id}

* **Method:**

  `GET`
  
* **Header**  

  * Token: access token 
  * UserId: user id 
  
*  **URL Params**

   * id: string

* **Data Params**

   * None

* **Success Response:**

  * **Code:** 200 <br />
  * **Content:** 
    ```
    { 
        error: null, 
        data: 
              {
                  "id": "abdefghijk123456789",
                  "name": "Man City reach first Champions League final",
                  "url": "https://www.bbc.co.uk/sport/football/56973031",
                  "author": "Phil McNulty",
                  "date": "2021-05-05T02:11:34Z"
              }
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
  **Content:** `{ error : ..., data: null }`
  **Causes:** Missing data in header
    
  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : ..., data: null }`
    **Causes:** Access token outdated
    
