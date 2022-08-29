import { RoleType } from '../../constants';
import { Column, Entity, OneToMany } from 'typeorm';
import BaseEntity from './base.entity';
import { PostEntity } from './post.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column()
  isActive?: boolean;

  @OneToMany(() => PostEntity, (postEntity) => postEntity.user)
  posts: PostEntity[];
}
