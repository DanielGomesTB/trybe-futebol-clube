import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

class Team extends Model {
  // declare <campo>: <tipo>;
  declare id: number;
  declare teamName: string;
}

Team.init({
  // ... Campos
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    type: STRING,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'User',
  timestamps: false,
  modelName: 'team',
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(User, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(User, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// User.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// User.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Team;
