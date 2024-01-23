import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import bcrypt from "bcryptjs";


export const Calendar = sequelize.define('Calendar', {
  startDate: {
    type: DataTypes.DATEONLY, // Para almacenar solo la fecha (dd/mm/yy)
    allowNull: true, // Permite valores nulos
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  changeDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  weekdays: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  timeRange: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  timestamps: false, // Desactivar campos createdAt y updatedAt
  hooks: {
    beforeUpdate: (instance, options) => {
      // Actualizar changeDate al momento de la actualización
      instance.changeDate = new Date().toISOString().slice(0, 10);
    },
  },
});


