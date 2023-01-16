import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function MaxLengthWithMessage(
  max: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'maxLengthWithMessage',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [max],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [max] = args.constraints;
          if (value === undefined || value === null || value.length <= max) {
            return true;
          }
          return false;
        },
        defaultMessage(args: ValidationArguments) {
          const [max] = args.constraints;
          return `${args.property} must be at most ${max} characters long, but got ${args.value.length}`;
        },
      },
    });
  };
}
