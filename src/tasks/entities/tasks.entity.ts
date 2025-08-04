import { STATUS_TASK } from 'src/constants/status-tasks';
import { BaseEntity } from 'src/config/base.entity';
import { ProjectEntity } from 'src/projects/entities/project.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
@Entity('task')
export class TasksEntity extends BaseEntity {
  @Column()
  taskName: string;
  @Column()
  taskDescription: string;
  @Column({ type: 'enum', enum: STATUS_TASK })
  status: STATUS_TASK;
  @Column()
  responsableName: string;
  @ManyToOne(() => ProjectEntity, (project) => project.tasks)
  @JoinColumn({
    name: 'project_id',
  })
  project: ProjectEntity;
}
