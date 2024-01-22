import { Module } from '@nestjs/common';
import { PaymentServiceController } from './payment.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [PaymentServiceController],
})
export class PaymentServiceModule {}
