import { Tenant } from 'src/tenant/entities/tenant.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 30 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar', length: 30 })
  role: string;

  @ManyToOne(() => Tenant, (tenant) => tenant.users)
  tenant: Tenant;
}
