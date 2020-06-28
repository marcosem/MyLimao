import express, {
  Express,
  // Request,
  // Response,
  // NextFunction,
  // Errback,
} from 'express';
import routes from './routes';

export default class App {
  server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    // this.exceptionHandler();
  }

  middlewares(): void {
    this.server.use(express.json());
  }

  routes(): void {
    this.server.use(routes);
  }

  /*
  exceptionHandler(): void {
    this.server.use(
      async (
        err: Errback,
        req: Request,
        res: Response,
        next: NextFunction,
      ) => {},
    );
  }
  */
}
