import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Users from './Users';

@Entity('appointments')
class Appointments {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => Users)
    @JoinColumn({ name: 'provider_id' })
    provider: Users;

    @Column('time with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // Quando utilizamos Entity o Constructor não é mais necessario
    // constructor({ provider, date }: Omit<Appointments, 'id'>) {
    //     this.id = uuid();
    //     this.provider = provider;
    //     this.date = date;
    //     }
}

export default Appointments;
