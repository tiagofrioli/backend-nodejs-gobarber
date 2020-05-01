import { isEqual } from 'date-fns';
import Appointments from '../models/Appointments';

interface AppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointments[];

    constructor() {
        this.appointments = [];
    }

    public allAppointments(): Appointments[] {
        return this.appointments;
    }

    // Metódo que verifica se duas datas de Appointment são iguais
    public findByDate(date: Date): Appointments | null {
        const findInSameDate = this.appointments.find(appointment =>
            isEqual(date, appointment.date),
        );

        return findInSameDate || null;
    }

    // Metódo que cria um novo Appointment
    public create({ provider, date }: AppointmentDTO): Appointments {
        const appointment = new Appointments({ provider, date });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
