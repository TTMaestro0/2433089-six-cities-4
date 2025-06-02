import { inject, injectable } from 'inversify';
import { Config, RestSchema } from '../shared/libs/config/index.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import express from 'express';
import { Logger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import {getMongoURI} from '../shared/helpers/index.js';
import {Controller, ExceptionFilter} from '../shared/libs/rest/index.js';
import cors from 'cors';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.UserController) private readonly userController: Controller,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.CommentController) private readonly commentController: Controller,
    @inject(Component.ExeptionFilter) private readonly exceptionFilter: ExceptionFilter
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database');
    await this.initDb();
    this.logger.info('Init database completed');

    const app = express();

    this.configureMiddlewares(app);

    app.use('/users', this.userController.router);
    app.use('/offers', this.offerController.router);
    app.use('/offers', this.commentController.router);

    app.use(this.exceptionFilter.handle.bind(this.exceptionFilter));

    app.listen(this.config.get('PORT'),
      () => this.logger.info(`Server running on: ${this.config.get('HOST')}`)
    );
  }

  private async initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );
    return this.databaseClient.connect(
      mongoUri
    );
  }

  private async configureMiddlewares(app: express.Application) {
    app.use(express.json());
    app.use('/static', express.static(this.config.get('STATIC_ROOT')));
    app.use(cors());
    app.use((req, _res, next) => {
      this.logger.info(`Catch request: ${req.method} ${req.url}`);
      next();
    });
  }
}
