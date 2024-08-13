// NPM Modules
import { Model } from 'objection';
import {Controller} from "../controller"
import knex from "knex";
import knexConfigs from "../../knex.configs";
const pg = knex(knexConfigs.development);
import bCrypt from "bcryptjs"

// Local Modules
// import PSQLStorage from '../storage/psql.storage';

class UsersModel extends Model {



  static get idColumn() { return 'id'; }

  static get tableName() { return 'admin_arm'; }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email', 'password'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        surname: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 10, maxLength: 255 },
        password: { type: 'string', minLength: 8, maxLength: 255 },
        picture: { type: 'string', minLength: 1, maxLength: 255 },
        role: { type: 'string', minLength: 0, maxLength: 10 },
      }
    };
  }

  $formatJson(json) {
    json = super.$formatJson(json);
    delete json.password;
    return json;
  }

  $beforeInsert() {
    const date = new Date();
    this.created_at = date;
  }

  $beforeUpdate() {
    const date = new Date();
    this.updated_at = date;
  }

  // Methods

  static register(result) {
    return pg("users").insert(result);
  }

  static async login (email) {
    const users = await pg("users").select("*").where("email", "=", email)
    return users[0]
  }

  static async findByEmailAdmin(email) {
    const a = await pg("admin_arm").select("*").where("email", "=", email);
    return a
  }

  static inputEmail (email) {
    return pg("users").select("email").where("email", "=", email)
  }

  static async forgotPassword(email) {
    
    let x = 7
   const a =  await pg("users").update({"conf_number":x}).where("email", "=", email).returning("*")

     return pg("users").select('*').where("email", "=", email)
  }




static async updateHomePageData(updatedData,params) {

    try {
      const result =
        params.lang === "AM"
          ? await pg("home_page_arm").where({ id: 1 }).update({
            main: pg.raw(`jsonb_set(main, '{${params.key}}', ?::jsonb)`, [JSON.stringify(updatedData)])
          })
          : params.lang === "EN"
          ? await pg("home_page_en").where({ id: 1 }).update({
            main: pg.raw(`jsonb_set(main, '{${params.key}}', ?::jsonb)`, [JSON.stringify(updatedData)])
          })
          : null;

      return result;
    } catch (error) {
      console.error('Error updating homepage:', error);
      throw error;  
    }


}


static async deleteAllHomePageData() {
  try {
      await pg('home_page_arm').where({ id: 1 }).del();
  } catch (error) {
      console.error('Error deleting homepage:', error);
      throw error;
  }
}


static async deleteOneHomePageData(params) {
  try {
    const result =
      params.lang === "AM"
        ? await pg("home_page_arm").where({ id: 1 }).update({
          main: pg.raw(`main - ?`, [params.key])
        })
        : params.lang === "EN"
        ? await pg("home_page_en").where({ id: 1 }).update({
          main: pg.raw(`main - ?`, [params.key])
        })
        : null;

    return result;
  } catch (error) {
    console.error('Error updating homepage:', error);
    throw error;  
  }
}


  static async getHomePage(lang) {
    try {
      const result =
        lang === "AM"
          ? await pg("home_page_arm").where({ id: 1 })
          : lang === "EN"
          ? await pg("home_page_en").where({ id: 1 })
          : null;
  
      return result;
    } catch (error) {
      console.error('Error updating homepage:', error);
      throw error;  
    }
  }
  
  
  static async setNewPass(data) {
    const selectedNumber = await pg("users").select("conf_number").where("email","=",data.email);
    
    if(data.number = selectedNumber[0].conf_number){
      try {
        data.password = bCrypt.hashSync(data.password, bCrypt.genSaltSync(10), null)
        delete data.number
        
              return pg("users").update(data).where("email","=",data.email).returning("*")
        } catch (error) {
            console.error('Error set new Pass:', error);
            throw error;
        }
    }

  }

  
}


export default UsersModel;
