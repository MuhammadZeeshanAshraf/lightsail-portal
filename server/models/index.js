import db from '../database/db';
import GeneralDatabaseFunction from './generalDatabaseFunction';

const Models = (database) => {
  return {
    generalDatabaseFunction: new GeneralDatabaseFunction(database)
  };
};

export default Models(db);
