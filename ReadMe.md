
Create Project
---
1.해당 폴더 전이 후 package.json, node_modules 생성
> npm init

2.express추가 
> npm express --save

-> package.json에 dependency 추가된거 확인가능.

3.index.js 시작점 파일 생성
<br>참조:
https://expressjs.com/en/starter/hello-world.html

4.package.json 파일에 시작점 지정
"scripts": {
    "start": "node index.js",

5.terminal 에서 실행해보기
npm run start

Create MongoDB
---
1.https://www.mongodb.com
2.create free tier cluster 
3.메인화면>해당 클러스터 connect 버튼>user 추가, 같은 화면에 whilte list 에 자신의 IP추가
4.choose a connection method > connect your application >표시된 링크 copy 후 어디 메모해둠

5.mongoose 인스톨
>$ npm install mongoose --save

6.index.js 가서 mongoose 객체 불러다가 4에서 복사한 url 추가
>
const mongoose = require('mongoose')
mongoose.connect( url , {각종옵션})
  .then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log(err))

MongoDB Model Schema
--
MongoDB Schema: document의, 기본값, validator 등의 구조를 정의한다.
<br>
MongoDB Model: database 를 위한 인터페이스를 제공한다.(레코드 CRUD 등)

1.model 폴더 생성> User.js생성

