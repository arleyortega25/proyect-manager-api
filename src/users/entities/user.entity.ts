import { ROLES } from '../../../src/constants/roles';
import { BaseEntity } from '../../../src/config/base.entity';
import { InterfaceUser } from '../../../src/interfaces/user.interface';
import {  Column, Entity, OneToMany } from 'typeorm';
import { UserProjectEntity } from './userProjects.entity';
@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements InterfaceUser {
  @Column()
  firstName: string;
  @Column()
  lastName: string;
  @Column()
  age: number;
  @Column({unique: true})
  email: string;
  @Column()
  password: string;
  @Column({type:'enum', enum:ROLES})
  role: ROLES;
  @Column({unique: true})
  username: string;
  @OneToMany(()=> UserProjectEntity,(userproject)=>userproject.user)
  projectsInclude:UserProjectEntity[]
}
