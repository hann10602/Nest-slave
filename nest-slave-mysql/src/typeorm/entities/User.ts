import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column()
  password: string;

  @Column()
  createdAt: Date;
}
