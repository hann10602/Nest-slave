import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'user-settings' })
export class UserSettings {
  @Field((type) => Int)
  @PrimaryColumn()
  userId: number;

  @Column()
  @Field({ defaultValue: false, nullable: true })
  receiveNotification: boolean;

  @Column()
  @Field({ defaultValue: false, nullable: true })
  receiveEmail: boolean;
}
