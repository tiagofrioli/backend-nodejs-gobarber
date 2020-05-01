import { startOfHour } from 'date-fns';
import Appointments from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
    provider: string;
    date: Date;
}

class CreateAppointmentService {
    // Dependency Inversion (SOLID)
    private appointmentRepository: AppointmentsRepository;

    constructor(appointmentRepository: AppointmentsRepository) {
        this.appointmentRepository = appointmentRepository;
    }

    public execute({ provider, date }: RequestDTO): Appointments {
        const appointmentDate = startOfHour(date);

        const findInSameDate = this.appointmentRepository.findByDate(
            appointmentDate,
        );

        if (findInSameDate) {
            throw Error('This appointment is booked !');
        }

        const appointment = this.appointmentRepository.create({
            provider,
            date: appointmentDate,
        });

        return appointment;
    }
}

export default CreateAppointmentService;
