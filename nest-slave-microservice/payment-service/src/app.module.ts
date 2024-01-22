import { Module } from '@nestjs/common';
import { PaymentServiceModule } from './payment/payment.module';

@Module({
  imports: [PaymentServiceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
