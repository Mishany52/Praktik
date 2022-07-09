import {Sequelize} from "sequelize"

const sequelize = new Sequelize('project', 'mishany', '309206', {
    host: 'localhost',
    dialect: 'postgres'
  });
sequelize.sync({force: true})
export default sequelize 