import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../database/sequelize.js"; // adjust to wherever the file above lives

interface LeadAttributes {
  id: number;
  name: string;
  phone: string;
  email?: string | null;
  city: string;
  product: string;
  source: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type LeadCreationAttributes = Optional<LeadAttributes, "id" | "email" | "source">;

export class Lead extends Model<LeadAttributes, LeadCreationAttributes> implements LeadAttributes {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email!: string | null;
  public city!: string;
  public product!: string;
  public source!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lead.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING(10), allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: false },
    product: { type: DataTypes.STRING, allowNull: false },
    source: { type: DataTypes.STRING, allowNull: false, defaultValue: "website" },
  },
  {
    sequelize,
    tableName: "leads",
    timestamps: true,
  }
);

// export default Lead;