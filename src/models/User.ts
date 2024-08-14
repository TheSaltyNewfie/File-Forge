import { DataTypes, Model } from 'sequelize'
import { sequelize } from './index'
import { Torrent } from './Torrent'

class User extends Model {
    public id!: number
    public name!: string
    public email!: string
    public password!: string
    public token!: string
    public permitted!: boolean
    public Torrents!: Torrent[]
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
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
        token: {
            type: new DataTypes.STRING(128),
            allowNull: true,
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
