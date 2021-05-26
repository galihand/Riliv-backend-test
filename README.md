# API Riliv Backend Test

## Base URL = https://riliv-test.herokuapp.com/api

---

## Admin

- Login
  - api: `POST` /admin/
  - request:
    - email: required | body
    - pass: required | body
  - response:
    ```js
    {
        "status": "success",
        "admin": {
            "id": 1,
            "email": "superadmin@mail.com",
            "fullname": "Super Admin",
            "createdAt": "2021-05-26T07:45:54.394Z",
            "updatedAt": "2021-05-26T07:45:54.394Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzdXBlcmFkbWluQG1haWwuY29tIiwiZnVsbG5hbWUiOiJTdXBlciBBZG1pbiIsImNyZWF0ZWRBdCI6IjIwMjEtMDUtMjZUMDc6NDU6NTQuMzk0WiIsInVwZGF0ZWRBdCI6IjIwMjEtMDUtMjZUMDc6NDU6NTQuMzk0WiIsImlhdCI6MTYyMjAxNTIxM30.QTV9aVgyC3dju34YCZdiWlPHnrUciBTAZCfQY45gMGE"
    }
    ```

---

## User

- Login

  - api: `POST` /user/
  - request:
    - email: required | body
    - pass: required | body
  - response:
    ```js
    {
      "status": "success",
      "user": {
        "id": 2,
        "email": "usersatu@mail.com",
        "fullname": "User satu",
        "createdAt": "2021-05-26T07:47:49.654Z",
        "updatedAt": "2021-05-26T07:47:49.654Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2Vyc2F0dUBtYWlsLmNvbSIsImZ1bGxuYW1lIjoiVXNlciBzYXR1IiwiY3JlYXRlZEF0IjoiMjAyMS0wNS0yNlQwNzo0Nzo0OS42NTRaIiwidXBkYXRlZEF0IjoiMjAyMS0wNS0yNlQwNzo0Nzo0OS42NTRaIiwiaWF0IjoxNjIyMDE1NzQxfQ.E1Er_g_--H4-4DpdVuCEM-MGXV0fkirv3wVx6Rx91ko"
    }
    ```

- Register
  - api: `POST` /user/register
  - request:
    - email: required | body
    - pass: required | body
    - fullname: required
  - response:
    ```js
    {
      "status": "success",
      "user": {
          "id": 3,
          "email": "userduad@mail.com",
          "fullname": "User dua",
          "updatedAt": "2021-05-26T07:47:58.918Z",
          "createdAt": "2021-05-26T07:47:58.918Z"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJ1c2VyZHVhZEBtYWlsLmNvbSIsImZ1bGxuYW1lIjoiVXNlciBkdWEiLCJ1cGRhdGVkQXQiOiIyMDIxLTA1LTI2VDA3OjQ3OjU4LjkxOFoiLCJjcmVhdGVkQXQiOiIyMDIxLTA1LTI2VDA3OjQ3OjU4LjkxOFoiLCJpYXQiOjE2MjIwMTUyNzh9.4eAoXIBtfchQMK6HF5z7yG9NoyXzLOGMbZjs_zOHTEo"
    }
    ```

---

## Item

- Create

  - api: `POST` /item/
  - request:
    - name: required | body
    - price: required | body | numeric
    - authorization: required | headers | token admin
  - response:
    ```js
    {
      "status": "success",
      "item": {
          "id": 4,
          "name": "Roti Tawar",
          "price": 13000,
          "updatedAt": "2021-05-26T07:51:35.662Z",
          "createdAt": "2021-05-26T07:51:35.662Z"
      }
    }
    ```

- Read all
  - api: `GET` /item/
  - request: -
  - response:
    ```js
    {
      "status": "success",
      "items": [
          {
              "id": 3,
              "name": "Fanta",
              "price": 20000,
              "createdAt": "2021-05-26T07:51:27.098Z",
              "updatedAt": "2021-05-26T07:51:27.098Z"
          },
          {
              "id": 4,
              "name": "Roti Tawar",
              "price": 13000,
              "createdAt": "2021-05-26T07:51:35.662Z",
              "updatedAt": "2021-05-26T07:51:35.662Z"
          },
          {
              "id": 1,
              "name": "Tango",
              "price": 2200,
              "createdAt": "2021-05-26T07:51:09.185Z",
              "updatedAt": "2021-05-26T07:52:51.566Z"
          }
      ]
    }
    ```
- Update

  - api: `PUT` /item/{item_id}
  - request:
    - name: optional | body
    - price: optional | body | numeric
    - authorization: required | headers | token admin
  - response:
    ```js
    {
      "status": "success",
      "item": {
          "id": 1,
          "name": "Tango",
          "price": 2200,
          "createdAt": "2021-05-26T07:51:09.185Z",
          "updatedAt": "2021-05-26T07:52:51.566Z"
      }
    }
    ```

- Delete

  - api: `DELETE` /item/{item_id}
  - request:
    - authorization: required | headers | token admin
  - response:
    ```js
    {
      "status": "success",
      "message": "Item has been delete"
    }
    ```

---

## Purchasing

- Create

  - api: `POST` /purchasing/
  - request:
    - items: required | body | array of object
      ```js
      {
        "items":[
            {
                "item_id":3,
                "quantity":"1"
            }
        ]
      }
      ```
    - authorization: required | headers | token user
  - response:
    ```js
    {
      "status": "success",
      "purchasing": {
          "id": 3,
          "user_id": 2,
          "transaction_code": "PRC-20214267562",
          "payment_code": 120,
          "total_price": 20000,
          "paid": false,
          "completed": false,
          "updatedAt": "2021-05-26T07:56:11.691Z",
          "createdAt": "2021-05-26T07:56:11.691Z"
      }
    }
    ```

- Read all
  - api: `GET` /purchasing/
  - request:
    - paid: optional | query params | boolean
    - completed: optional | query params | boolean
    - trans_code: optional | query params | transaction code of purchasing
    - authorization: required | headers | token admin
  - response:
    ```js
    {
      "status": "success",
      "purchasings": [
          {
              "id": 1,
              "user_id": 1,
              "transaction_code": "PRC-20214267541",
              "payment_code": 1,
              "total_price": 22200,
              "paid": false,
              "completed": false,
              "createdAt": "2021-05-26T07:54:55.281Z",
              "updatedAt": "2021-05-26T07:54:55.281Z"
          },
          {
              "id": 3,
              "user_id": 2,
              "transaction_code": "PRC-20214267562",
              "payment_code": 120,
              "total_price": 20000,
              "paid": false,
              "completed": false,
              "createdAt": "2021-05-26T07:56:11.691Z",
              "updatedAt": "2021-05-26T07:56:11.691Z"
          },
          {
              "id": 2,
              "user_id": 1,
              "transaction_code": "PRC-20214267551",
              "payment_code": 183,
              "total_price": 33000,
              "paid": true,
              "completed": false,
              "createdAt": "2021-05-26T07:55:14.367Z",
              "updatedAt": "2021-05-26T08:03:10.469Z"
          }
      ]
    }
    ```
- Read history of purchasing user

  - api: `GET` /purchasing/history
  - request:
    - authorization: required | headers | token user
  - response:
    ```js
    {
      "status": "success",
      "purchasings": [
          {
              "id": 1,
              "user_id": 1,
              "transaction_code": "PRC-20214267541",
              "payment_code": 1,
              "total_price": 22200,
              "paid": false,
              "completed": false,
              "createdAt": "2021-05-26T07:54:55.281Z",
              "updatedAt": "2021-05-26T07:54:55.281Z"
          },
          {
              "id": 3,
              "user_id": 2,
              "transaction_code": "PRC-20214267562",
              "payment_code": 120,
              "total_price": 20000,
              "paid": false,
              "completed": false,
              "createdAt": "2021-05-26T07:56:11.691Z",
              "updatedAt": "2021-05-26T07:56:11.691Z"
          },
          {
              "id": 2,
              "user_id": 1,
              "transaction_code": "PRC-20214267551",
              "payment_code": 183,
              "total_price": 33000,
              "paid": true,
              "completed": false,
              "createdAt": "2021-05-26T07:55:14.367Z",
              "updatedAt": "2021-05-26T08:03:10.469Z"
          }
      ]
    }
    ```

- Read purchasing detail

  - api: `GET` /purchasing/{purchasing_id}
  - request:
    - authorization: required | headers | token admin or user
  - response:

    ```js
      {
      "status": "success",
      "purchasing": {
          "id": 2,
          "transaction_code": "PRC-20214267551",
          "payment_code": 183,
          "total_price": 33000,
          "paid": false,
          "completed": false,
          "createdAt": "2021-05-26T07:55:14.367Z",
          "updatedAt": "2021-05-26T07:55:14.367Z",
          "items": [
              {
                  "id": 3,
                  "name": "Fanta",
                  "purchasing_item": 1
              },
              {
                  "id": 4,
                  "name": "Roti Tawar",
                  "purchasing_item": 3
              }
          ],
          "user": {
              "id": 1,
              "email": "userbaru@mail.com",
              "fullname": "User Baru"
          }
      }

    }
    ```

- Confirm Payment

  - api: `PUT` /purchasing/{purchasing_id}/paid
  - request:
    - authorization: required | headers | token admin
  - response:
    ```js
    {
      "status": "success",
      "purchasing": {
          "id": 3,
          "user_id": 2,
          "transaction_code": "PRC-20214267562",
          "payment_code": 120,
          "total_price": 20000,
          "paid": true,
          "completed": false,
          "createdAt": "2021-05-26T07:56:11.691Z",
          "updatedAt": "2021-05-26T08:04:02.566Z",
          "items": [
              {
                  "id": 3,
                  "name": "Fanta",
                  "purchasing_item": 1
              }
          ]
      }
    }
    ```

- Complete purchasing

  - api: `PUT` /purchasing/{purchasing_id}/completed
  - request:
    - authorization: required | headers | token admin
  - response:
    ```js
    {
      "status": "success",
      "purchasing": {
          "id": 3,
          "user_id": 2,
          "transaction_code": "PRC-20214267562",
          "payment_code": 120,
          "total_price": 20000,
          "paid": true,
          "completed": true,
          "createdAt": "2021-05-26T07:56:11.691Z",
          "updatedAt": "2021-05-26T08:04:31.934Z",
          "items": [
              {
                  "id": 3,
                  "name": "Fanta",
                  "purchasing_item": 1
              }
          ]
      }
    }
    ```

---

## Report

- Read sales item
  - api: `GET` /report/sales-item
  - request:
    - desc: optional | query params | boolean | true will sort descending
    - authorization: required | headers | token admin
  - response:
    ```js
    {
      "status": "success",
      "items": [
          {
              "id": 3,
              "name": "Fanta",
              "price": 20000,
              "createdAt": "2021-05-26T07:51:27.098Z",
              "updatedAt": "2021-05-26T07:51:27.098Z",
              "sold": 5,
              "number_of_transaction": 3
          },
          {
              "id": 4,
              "name": "Roti Tawar",
              "price": 13000,
              "createdAt": "2021-05-26T07:51:35.662Z",
              "updatedAt": "2021-05-26T07:51:35.662Z",
              "sold": 3,
              "number_of_transaction": 1
          },
          {
              "id": 1,
              "name": "Tango",
              "price": 2200,
              "createdAt": "2021-05-26T07:51:09.185Z",
              "updatedAt": "2021-05-26T07:52:51.566Z",
              "sold": 1,
              "number_of_transaction": 1
          }
      ]
    }
    ```
- Read user purchases

  - api: `GET` /report/user-purchases
  - request:
    - desc: optional | query params | boolean | true will sort descending
  - response:
    ```js
    {
      "status": "success",
      "users": [
          {
              "id": 1,
              "email": "userbaru@mail.com",
              "fullname": "User Baru",
              "createdAt": "2021-05-26T07:47:29.874Z",
              "updatedAt": "2021-05-26T07:47:29.874Z",
              "number_of_transactions": 2,
              "total_transactions": 55200
          },
          {
              "id": 2,
              "email": "usersatu@mail.com",
              "fullname": "User satu",
              "createdAt": "2021-05-26T07:47:49.654Z",
              "updatedAt": "2021-05-26T07:47:49.654Z",
              "number_of_transactions": 1,
              "total_transactions": 20000
          }
      ]
    }
    ```

- Read income report

  - api: `GET` /report/income
  - request:
    - start_date: optional | query params | format(yyyy-mm-dd)
    - end_date: optional | query params | format(yyyy-mm-dd)
    - authorization: required | headers | token admin
  - response:

    ```js
    {
      "status": "success",
      "income": {
          "number_of_transaction": 3,
          "total_transactions": 75200
      }
    }
    ```
