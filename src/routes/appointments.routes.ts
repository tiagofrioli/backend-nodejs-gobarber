import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();
const appointmentRepository = new AppointmentsRepository();

// Middleware aplica autenticação em todas as rotas de appointments
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentRepository.allAppointments();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
        appointmentRepository,
    );

    const appointment = createAppointment.execute({
        provider_id,
        date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
