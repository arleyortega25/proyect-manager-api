import { UserProjectEntity } from '../../../src/users/entities/userProjects.entity';
import { BaseEntity } from '../../../src/config/base.entity';
import { InterfaceProject } from '../../../src/interfaces/project.interface';
import { Column, Entity, OneToMany } from 'typeorm';
@Entity({ name: 'projects' })
export class ProjectEntity extends BaseEntity implements InterfaceProject {
  @Column()
  name: string;
  @Column()
  description: string;
  @OneToMany(()=>UserProjectEntity,(userproject)=>userproject.project)
  usersInclude: UserProjectEntity[]
}
