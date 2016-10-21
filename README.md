# 영어 사내스터디 하는 내용을 정리하는 웹 애플리케이션

## Purpose
* Study English
* Study Technical for Front-End(Reactjs, Redux, Mongo DB, Node, Express)

## 기술
* express
* mongodb
* reactjs, redux

## setup env
### mongodb
* brew update && brew install mongodb
* sudo mkdir -p /data/db
* sudo chown $USER /data/db

### npm module
* npm install -g webpack webpack-dev-server
* npm install -g babel-cli nodemon cross-env
* npm install


## Run
### Dev
* mongod
* mongo
* webpack --watch
* npm run develpment

### Production
* mongod
* mongo
* npm run clean
* npm run build
* npm run start

## TODO
* ~~RESTful API Server~~
* ~~Feature~~
  * ~~Register~~
  * ~~Login~~
  * ~~Logout~~
  * ~~Insert Card~~
  * ~~List Card~~
  * View Card
  * Delete Card
  * Update Card
* Modules
  * Modal

## 참고
* https://velopert.com/1921 Express 와 React.js 를 사용한 웹 어플리케이션 만들기
* Bootstrap and SB Admin Theme