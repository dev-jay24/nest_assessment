import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column()
  created_at: Date;

  @OneToMany(() => User, (user) => user.tenant)
  users: User[];

  @OneToMany(() => Product, (product) => product.tenant)
  products: Product[];
}
