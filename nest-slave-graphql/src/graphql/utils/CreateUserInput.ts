import { Field, InputType } from '@nestjs/graphql';
import { CreateUserSettingsInput } from './CreateUserSettings';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field({
    nullable: true,
  })
  displayName: string;

  @Field({
    nullable: true,
  })
  settings: CreateUserSettingsInput;
}
