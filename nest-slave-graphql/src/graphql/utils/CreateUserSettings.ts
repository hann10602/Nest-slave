import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateUserSettingsInput {
  @Field((type) => Int, { nullable: false })
  userId: number;

  @Field({ defaultValue: false, nullable: true })
  receiveEmail: boolean;

  @Field({ defaultValue: false, nullable: true })
  receiveNotification: boolean;
}
