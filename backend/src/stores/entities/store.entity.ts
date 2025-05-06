import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Rating } from '../../ratings/entities/rating.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 60 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 400, nullable: true })
  address: string;

  @ManyToOne(() => User, (user) => user.stores)
  owner: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Rating, (rating) => rating.store)
  ratings: Rating[];
}