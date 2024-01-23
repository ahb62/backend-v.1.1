import { Calendar } from "../../models/calendar.model.js";

export const calendarController = {
	getAllCalendars: async (req, res) => {
		try {
			const calendars = await Calendar.findAll();
			res.json(calendars);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	},

	getCalendarById: async (req, res) => {
		const { id } = req.params;
		try {
			const calendar = await Calendar.findByPk(id);
			if (calendar) {
				res.json(calendar);
			} else {
				res.status(404).json({ error: "Calendar not found" });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	},

	createCalendar: async (req, res) => {
		const calendarData = req.body;
		try {
			const newCalendar = await Calendar.create(calendarData);
			res.status(201).json(newCalendar);
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	},

	updateCalendar: async (req, res) => {
		const { id } = req.params;
		const updatedData = req.body;
		try {
			const [rowsUpdated, [updatedCalendar]] = await Calendar.update(
				updatedData,
				{
					where: { id },
					returning: true,
				}
			);
			if (rowsUpdated > 0) {
				res.json(updatedCalendar);
			} else {
				res.status(404).json({ error: "Calendar not found" });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	},

	deleteCalendar: async (req, res) => {
		const { id } = req.params;
		try {
			const rowsDeleted = await Calendar.destroy({ where: { id } });
			if (rowsDeleted > 0) {
				res.json({ message: "Calendar deleted successfully" });
			} else {
				res.status(404).json({ error: "Calendar not found" });
			}
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	},
};

