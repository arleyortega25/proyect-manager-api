import { BaseEntity } from "../../../src/config/base.entity";
import { ACCESS_LEVEL } from "../../../src/constants/roles";
import { Column, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { ProjectEntity } from "../../../src/projects/entities/project.entity";
@Entity({name:'users_projects'})
export class UserProjectEntity extends BaseEntity{
    @Column({type:'enum', enum:ACCESS_LEVEL})
    access_level:ACCESS_LEVEL
    @ManyToOne(()=> UserEntity,(user)=>user.projectsInclude)
    user:UserEntity
    @ManyToOne(()=>ProjectEntity,(project)=>project.usersInclude)
    project:ProjectEntity
}