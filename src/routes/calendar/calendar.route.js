import {Router} from 'express';
import {calendarController} from '../../controllers/calendario/calendar.controller.js';
export const calendar_router = Router();
// Rutas CRUD para Calendar
calendar_router.get('/', calendarController.getAllCalendars);
calendar_router.get('/:id', calendarController.getCalendarById);
calendar_router.post('/', calendarController.createCalendar);
calendar_router.put('/:id', calendarController.updateCalendar);
calendar_router.delete('/:id', calendarController.deleteCalendar);

