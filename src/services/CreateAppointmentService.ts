import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointments from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({
        provider_id,
        date,
    }: RequestDTO): Promise<Appointments> {
        const appointmentRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        const findInSameDate = await appointmentRepository.findByDate(
            appointmentDate,
        );

        if (findInSameDate) {
            throw new AppError('This appointment is booked !');
        }

        const appointment = appointmentRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
