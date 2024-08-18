import { DataTypes, Model } from 'sequelize'
import { sequelize } from './index'
import { Torrent } from './Torrent'

class User extends Model {
    public id!: number
    public name!: string
    public email!: string
    public password!: string
    public permitted!: boolean
    public role!: string
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
            unique: true,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        permitted: {
            type: new DataTypes.BOOLEAN(),
            allowNull: false,
        },
        role: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
    },
    {
        tableName: 'users',
        sequelize,
    }
)

export { User }
