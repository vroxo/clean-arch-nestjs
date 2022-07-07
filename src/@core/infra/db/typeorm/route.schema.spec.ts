import { Route } from '../../../domain/route.entity';
import { DataSource } from 'typeorm';
import { RouteSchema } from './route.schema';

describe('RouteSchema Tests', () => {
  test('create', async () => {
    const datasource = new DataSource({
      type: 'sqlite',
      database: ':memory:',
      synchronize: true,
      logging: false,
      entities: [RouteSchema],
    });
    await datasource.initialize();
    const route = Route.create({
      title: 'minha rota',
      startPosition: { lat: 0, lng: 1 },
      endPosition: { lat: 2, lng: 3 },
      points: [{ lat: 2, lng: 3 }],
    });

    const routeRepo = datasource.getRepository(Route);
    await routeRepo.save(route);

    console.log(await routeRepo.findOneBy({ id: route.id }));
  });
});
