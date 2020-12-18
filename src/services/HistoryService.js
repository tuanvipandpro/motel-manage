const HistoryRepository = require('../repositorys/HistoryRepository')

module.exports = {
    makeHistory: async (data, updater, date) => {
        return HistoryRepository.makeHistory(data.map(e => [e.id, e.newElectric, e.newWater, date, updater, true]))
    }
}