import { Container } from 'inversify';
import 'reflect-metadata';
import { RestApplication } from './rest/index.js';
import { createApplicationContainer } from './rest/rest.container.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createCommentContainer } from './shared/modules/comment/index.js';
import { Component } from './shared/types/index.js';

async function bootstrap() {
  const container = Container.merge(
    createApplicationContainer(),
    createUserContainer(),
    createOfferContainer(),
    createCommentContainer()
  );

  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
