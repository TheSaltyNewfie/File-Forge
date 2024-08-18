import { DataTypes, Model } from 'sequelize'
import { sequelize } from './index'

class Setting extends Model {
    public id!: number
    public key!: string
    public value!: string
    public readonly createdAt!: Date
    public readonly updatedAt!: Date
}

Setting.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        key: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
        value: {
            type: new DataTypes.STRING(128),
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: 'settings',
        sequelize,
    }
)

export { Setting }
