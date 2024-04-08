import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class OrderDTO {
  @Field(() => ID, { nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  updated: Date;

  @Field({ nullable: true })
  created: Date;
}
