import { BATCH_SIZE } from '../constants';

export default class GeneralDatabaseFunction {
  constructor(db) {
    this.db = db;
  }

  async checkTableExistance(table) {
    return this.db.schema.hasTable(table);
  }

  async truncateTable(table) {
    return this.db(table).truncate();
  }

  async truncateMultipleTable(tables) {
    for (const table of tables) {
      this.db(table).truncate();
    }
  }

  rawQueryExceutor(query) {
    return this.db.raw(query);
  }

  async insertSingleRowWithReturn(schema, table, mapObj, returnColumnName) {
    try {
      return this.db(`${schema}.${table}`).returning(returnColumnName).insert(mapObj);
    } catch (error) {
      console.log(error);
    }
  }

  async updateSingleRowWithReturn(schema, table, mapObj, whereObj) {
    try {
      console.log(this.db(`${schema}.${table}`).where(whereObj).update(mapObj).toString());
      return this.db(`${schema}.${table}`).where(whereObj).update(mapObj);
    } catch (error) {
      console.log(error);
    }
  }

  async insertMultipleRows(schema, table, data) {
    console.log('Rows :-', data.length);
    const promises = [];
    while (data.length > 0) {
      const dataBatch = data.splice(0, BATCH_SIZE);
      promises.push(this.db(`${schema}.${table}`).insert(dataBatch));
    }
    await Promise.all(promises);
  }

  getDatabySingleWhereColumn(schema, table, whereColumnName, whereColumnValue) {
    return this.db.select().table(`${schema}.${table}`).where(whereColumnName, whereColumnValue);
  }

  getAllData(schema, table) {
    return this.db.select().table(`${schema}.${table}`);
  }

  async getSimpleMaxByColumn(schema, table, maxColumnName, whereColumnName, whereValue) {
    try {
      let maxObj;
      if (typeof whereColumnName === 'undefined' && typeof whereValue === 'undefined') {
        maxObj = await this.db(`${schema}.${table}`).max(`${maxColumnName} as maxID`).first();
      } else {
        maxObj = await this.db(`${schema}.${table}`).where(whereColumnName, whereValue).max(`${maxColumnName} as maxID`).first();
      }
      const { maxID } = maxObj;
      if (maxID === null) {
        return 1;
      } else {
        return maxID;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getComplexMaxByColumn(schema, table, maxColumnName, whereMap) {
    try {
      const maxObj = await this.db(`${schema}.${table}`).where(whereMap).max(`${maxColumnName} as maxID`).first();
      const { maxID } = maxObj;
      if (maxID === null) {
        return 1;
      } else {
        return maxID;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
