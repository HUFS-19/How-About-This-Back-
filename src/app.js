import 'dotenv/config';
import express from 'express';
import path from 'path';
import db from './db.js';
import cors from 'cors';

import productRouters from './routers/productRouters';
const test = require('./routers/login');

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.set('port', 5000);

app.use(express.static(path.join(__dirname, '../front-end/build')));

app.use('/src/Mimg', express.static('src/Mimg'));

app.use('/product', productRouters);
app.use('/login', test);

app.get('*', (req, res) => {
  //나머지 경로로 요청이 올 시 front의 빌드 파일 반환
  res.sendFile(path.join(__dirname, '../front-end/build/index.html'));
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
