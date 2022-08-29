import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  //   toDto(options?: O): DTO {
  //     const dtoClass = this.dtoClass;

  //     if (!dtoClass) {
  //       throw new Error(
  //         `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
  //       );
  //     }

  //     return new this.dtoClass(this, options);
  //   }
}
