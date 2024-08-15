// export const repositoryMock = {
//   save: jest.fn(),
//   findOneBy: jest.fn(),
//   findBy: jest.fn(),
//   find: jest.fn(),
//   delete: jest.fn(),
//   createQueryBuilder: jest.fn(() => ({
//     select: jest.fn().mockReturnThis(),
//     addSelect: jest.fn().mockReturnThis(),
//     where: jest.fn().mockReturnThis(),
//     groupBy: jest.fn().mockReturnThis(),
//     leftJoinAndSelect: jest.fn().mockReturnThis(),
//     andWhere: jest.fn().mockReturnThis(),
//     skip: jest.fn().mockReturnThis(),
//     take: jest.fn().mockReturnThis(),
//     orderBy: jest.fn().mockReturnThis(),
//     getMany: jest.fn(),
//     getRawMany: jest.fn(),
//   })),
// };

export abstract class MockRepository<T> {
  protected entiryStub: T;

  // findOneBy() {
  //   return this.entiryStub;
  // }

  // Mock of the TypeORM `save` method
  save(entity: Partial<T>): Promise<T> {
    return Promise.resolve({ ...this.entiryStub, ...entity });
  }

  // Mock of the TypeORM `findOneBy` method
  findOneBy(conditions: Partial<T>): Promise<T | null> {
    return Promise.resolve(this.entiryStub);
  }

  // Mock of the TypeORM `findBy` method
  findBy(conditions: Partial<T>): Promise<T[]> {
    return Promise.resolve([this.entiryStub]);
  }

  // Mock of the TypeORM `find` method
  find(): Promise<T[]> {
    return Promise.resolve([this.entiryStub]);
  }

  // Mock of the TypeORM `delete` method
  delete(conditions: Partial<T>): Promise<{ affected: number }> {
    return Promise.resolve({ affected: 1 });
  }

  // Mock of the TypeORM `createQueryBuilder` method
  createQueryBuilder() {
    return {
      select: jest.fn().mockReturnThis(),
      addSelect: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      groupBy: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([this.entiryStub]),
      getRawMany: jest.fn().mockResolvedValue([this.entiryStub]),
    };
  }
}
