import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/sequelize.js"; // adjust to wherever the file above lives
export class Lead extends Model {
    id;
    name;
    phone;
    email;
    city;
    product;
    source;
    createdAt;
    updatedAt;
}
Lead.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING(10), allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: false },
    product: { type: DataTypes.STRING, allowNull: false },
    source: { type: DataTypes.STRING, allowNull: false, defaultValue: "website" },
}, {
    sequelize,
    tableName: "leads",
    timestamps: true,
});
