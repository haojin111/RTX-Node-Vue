// hotel db schema
import Sequelize from "sequelize";
export default class Hotel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.STRING(4), primaryKey: true },    // property id
        name: { type: DataTypes.STRING, allowNull: false },     // property name
        country: { type: DataTypes.STRING(2), allowNull: true },// country code
        score: { type: DataTypes.INTEGER, allowNull: true },    // score
      },
      {
        paranoid: true,
        timestamps: true,
        updatedAt: 'updatedAt',
        createdAt: 'createdAt',
        deletedAt: 'deletedAt',
        tableName: "Hotel",
        sequelize
      }
    );
  }
}
