import { User } from './User'
import { Torrent } from './Torrent'

export function createAssociations() {
    User.hasMany(Torrent, { foreignKey: 'userId' })
    Torrent.belongsTo(User, { foreignKey: 'userId' })
}
