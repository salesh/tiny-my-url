# TinyUrl

## Technologies and Development

* Node.js with Express.js and TypeScript
* MongoDB
* Angular

## Quick Overview
Starting Angular
```sh
cd client/
npm install
npm start
```

Starting NodeJS
Please rename .env.examle -> .env
```sh
cd server/
npm install
npm run build
npm run start
```

## Home Assignment

### 1. What is a URL shortening system?

URL shortening system is a system which functionality is to create short URL links from user input. With this system we can create a custom or branded URL shortener.

### 2. What's the main value? Who needs such a system and why?

Main value and reasons for:
The main value of URL shortening is tracking and analyze audience and campaign performance and URL links look better than their longer shapes.
It’s a lot easier to distribute, manage or memorize URL links.
Creating own brand.
Companies for branding, tracking and analyzing the audience and generally creating more human URL links because Web applications often include lengthy descriptive attributes in their URLs which represent data hierarchies, command structures, transaction paths and session information.
Improving sharing because inputs that have a character length limit.

### 3. Describe The main mechanism of work and system components.

Following technologies are used:
1. NodeJS (TypeScript) / ExpressJS - for server code
2. Angular TypeScript - for client code
3. MongoDB / mongoose - for database

[![MEAN Logo](https://repository-images.githubusercontent.com/130965587/b90ceb00-3b77-11ea-935e-587024bf326e)](http://meanjs.org/)


There are 3 routes:
1) POST /tinyurl
Input: ‘url’ in body request 
Output: generated/updated TinyUrl object that have: code, tinyUrl, userUrl, hostname, counter, createdAt, updateAt
2) GET /tinyurl/daily-statistic
Output: in last 24h most input domains (case with the same URL covered we count in counter)
3) GET /:tinyUrlCode
Input: code - get redirect URL with code
Output: userUrl

Home route on Angular (http://localhost:4200) brings us to place where we can generate our short URL after we can click it and get redirect to our link.
For generating short URL, I picked a nanoid library with 7 characters for 200 URLs per/second there is the possibility that in ~25min there is a 1% possibility of the same code.
For possible same URLs entries we manage counter and use the same code from the database.

There is currently no authorize admin route http://localhost:4200/#/admin for 24h most input domains.

### 4. What do you think are the main challenges in implementing and running the system
1) Algorithm - current implementation doesn’t use user URL maybe current is not good for the long run, a better approach would be some serious hashing URL. Second options would be some kind of early generated codes
2) Choosing database approach
3) The system needs to be highly available
4) URL redirection with minimal-latency and not predictable URLs
5) Maybe some user-specific things (because repeating)
6) Cashing

### 5. Try to suggest some ideas for advanced features.
1) User-specific links
2) Using Redis for cashing most input domains
3) Time limit
