import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class TodoOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  completed: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
