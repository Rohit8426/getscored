import { DataTypes, Model, } from "sequelize";
import { sequelize } from "../database/sequelize.js";
export class Page extends Model {
}
Page.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING(160),
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING(180),
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
}, {
    sequelize,
    tableName: "pages",
    indexes: [
        {
            unique: true,
            fields: ["slug"],
        },
    ],
});
