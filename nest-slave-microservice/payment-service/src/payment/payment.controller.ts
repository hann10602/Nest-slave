import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreatePaymentDto } from './dto/CreatePayment.dto';

@Controller()
export class PaymentServiceController {
  @EventPattern('createPayment')
  createUser(@Payload() data: CreatePaymentDto) {
    console.log(data);

    return { msg: 'success' };
  }
}
