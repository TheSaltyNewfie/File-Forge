import { DataTypes, Model } from 'sequelize'
import { sequelize } from './index'
import { User } from './User'

class Torrent extends Model {
    public id!: number
    public title!: string
    public magnet!: string
    public size!: string
    public seeders!: number
    public leechers!: number
    public userId!: number
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Torrent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        magnet: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        size: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        seeders: {
            type: new DataTypes.INTEGER(),
            allowNull: false,
        },
        leechers: {
            type: new DataTypes.INTEGER(),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    },
    {
        tableName: 'torrents',
        sequelize,
    }
)

export { Torrent }
