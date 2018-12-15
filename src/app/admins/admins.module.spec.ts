import { AdminsModule } from './admins.module';

describe('AdminsModule', () => {
  let adminsModule: AdminsModule;

  beforeEach(() => {
    adminsModule = new AdminsModule();
  });

  it('should create an instance', () => {
    expect(adminsModule).toBeTruthy();
  });
});
