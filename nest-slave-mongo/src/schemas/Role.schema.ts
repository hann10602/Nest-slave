import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Role {
  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ unique: true, required: true })
  code: string;
}

export const RoleSchema = SchemaFactory.createForClass(Role);
