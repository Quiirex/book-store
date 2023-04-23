import express, { Express, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import { createServer } from 'http';
import { AddressInfo } from 'net';
import routes from './routes/router';

const router: Express = express();

router.use(morgan('dev'));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

router.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, DELETE, POST');
    return res.status(200).json({});
  }
  next();
});

router.use('/', routes);

router.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('Not found');
  next(error);
});

router.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error.stack);
  res.status(500).json({
    message: error.message,
  });
});

const httpServer = createServer(router);
const host = '0.0.0.0';
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

async function startServer() {
  try {
    await new Promise<void>((resolve, reject) => {
      httpServer.listen(port, host, () => {
        const { address, port } = httpServer.address() as AddressInfo;
        console.log(`Web API Gateway listening on http://${address}:${port}`);
        resolve();
      });
      httpServer.on('error', reject);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
}

startServer();
