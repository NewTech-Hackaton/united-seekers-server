import {DataSource, DataSourceOptions} from "typeorm";
import * as dotenv from "dotenv"
import {Volunteer} from "../volunteers/volunteers.entity";
import {Announcement} from "../announcements/announcements.entity";
import {Token} from "../tokens/tokens.entity";
import {Feedback} from "../feedbacks/feedbacks.entity";
dotenv.config()

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: String(process.env.POSTGRES_PASSWORD),
    database: process.env.POSTGRES_DB,
    synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
    migrations: [__dirname + process.env.TYPEORM_MIGRATIONS],
    entities: [Volunteer, Token, Announcement, Feedback]

}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource;