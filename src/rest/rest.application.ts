import { inject, injectable } from 'inversify';
import { Config } from '../shared/libs/config/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { Logger } from '../shared/libs/logger/logger.interface.js';
import { Component } from '../shared/types/component.enum.js';
import { DatabaseClient } from '../shared/libs/database-client/database-client.interface.js';
import express, { Express } from 'express';
import { getMongoURI } from '../shared/helpers/database.js';
import { BaseController, ExceptionFilter } from '../shared/libs/rest/index.js';

@injectable()
export class RestApplication {
  private server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
    @inject(Component.UserController) private readonly userController: BaseController,
    @inject(Component.OfferController) private readonly offerController: BaseController,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
  ) {
    this.server = express();
  }

  private async _initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async _initControllers() {
    this.server.use('/users', this.userController.router);
    this.server.use('/offers', this.offerController.router);
  }

  private async _initMiddleware() {
    this.server.use(express.json());
  }

  private async _initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  private async _initDb() {
    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );
    return this.databaseClient.connect(mongoUri);
  }

  public async init() {
    this.logger.info('Application initialized');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this._initDb();
    this.logger.info('Init database completed');

    this.logger.info('Init app-level middleware...');
    await this._initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers...');
    await this._initControllers();
    this.logger.info('Controllers initialization completed');

    this.logger.info('Init exception filters');
    await this._initExceptionFilters();
    this.logger.info('Exception filters initialization compleated');

    this.logger.info('Try to init server...');
    await this._initServer();
    this.logger.info(`Server started on https://localhost:${this.config.get('PORT')}`);
  }
}
