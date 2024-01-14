import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserType } from '../utils/user.type';

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: CreateUserType, metadata: ArgumentMetadata) {
    // const parseAgeToInt = parseInt(value.age.toString());
    // if (isNaN(parseAgeToInt)) {
    //   console.log(`${value.age} is not a number`);
    //   throw new HttpException(
    //     'Invalid data type for property age. Expected number',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    // console.log(parseAgeToInt + ' is a number');
    // return { ...value, age: parseAgeToInt };
  }
}
