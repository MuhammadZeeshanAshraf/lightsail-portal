import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import path from 'path';
import router from './routes';

const apisPath = path.join(__dirname, 'routes', '*.js');
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Post Tracking Portal Backend',
      version: '1.0.0',
      description:
        'This is Post Tracking Portal Backend',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html'
      }
    },
    servers: [
      {
        url: 'https://exam360.co.in/',
        description: 'Development server'
      }
    ],
    host: 'https://exam360.co.in/',
    basePath: '/post-tracking-portal/api/v1'
  },
  tags: {
    name: 'Tracking Operations'
  },
  apis: [apisPath]

};
const app = express();

app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

const swaggerDocs = swaggerJSDoc(swaggerOptions);

// middlewares
app.use(logger('dev'));
app.use(
  express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 })
);
app.use(express.json({ limit: '50mb' }));

app.use(
  cors({
    origin: '*'
  })
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

app.use('/post-tracking-portal/api/v1', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  console.log('Error is : ', error);
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

export default app;
