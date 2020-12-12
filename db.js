const { Pool } = require('pg')

const con = new Pool({
    user: 'ryqnobggllashp',
    host: 'ec2-54-166-114-48.compute-1.amazonaws.com',
    database: 'd6696gkpumul5k',
    password: '84367b60f34888eaaaadf2196eb1b9534877fb70fafd80a4206b261f6cde8740',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
})

module.exports = con