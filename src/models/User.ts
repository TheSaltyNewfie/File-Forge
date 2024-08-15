import { DataTypes, Model } from 'sequelize'
import { sequelize } from './index'
import { Torrent } from './Torrent'

class User extends Model {
    public id!: number
    public name!: string
    public email!: string
    public password!: string
    public permitted!: boolean
    public readonly createdAt!: Date
    public readonly updatedAt!: Date

    public getTorrents!: () => Promise<Torrent[]>
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        permitted: {
            type: new DataTypes.BOOLEAN(),
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        sequelize,
    }
)

export { User }
