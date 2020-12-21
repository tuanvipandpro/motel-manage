const HistoryRepository = require('../repositorys/HistoryRepository')

module.exports = {
    /**
     * Create History for bill
     * @param {*} data 
     * @param {*} updater 
     * @param {*} date 
     */
    makeHistory: async (data, updater, date) => {
        return HistoryRepository.makeHistory(data.map(e => [e.id, e.newElectric, e.newWater, date, updater, true]))
    }
}