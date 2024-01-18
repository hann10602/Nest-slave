import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSettings } from './UserSetting';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity({ name: 'user' })
export class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Field()
  @Column()
  username: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  displayName?: string;

  @Field({ nullable: true })
  @OneToOne(() => UserSettings)
  @JoinColumn()
  settings?: UserSettings;
}
