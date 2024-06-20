var bcrypt = require('bcryptjs');

const createHash = (data) => bcrypt.hashSync(data, 10);

export default createHash;
