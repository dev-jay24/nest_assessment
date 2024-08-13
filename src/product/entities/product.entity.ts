import { Tenant } from 'src/tenant/entities/tenant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @Column()
  price: number;

  @ManyToOne(() => Tenant, (tenant) => tenant.products)
  tenant: Tenant;
}
