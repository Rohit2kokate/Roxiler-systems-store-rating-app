import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Store } from '../../stores/entities/store.entity';
import { Rating } from '../../ratings/entities/rating.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ length: 400, nullable: true })
  address: string;

  @Column({ type: 'enum', enum: ['ADMIN', 'USER', 'STORE_OWNER'] })
  role: 'ADMIN' | 'USER' | 'STORE_OWNER';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Store, (store) => store.owner)
  stores: Store[];

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
}