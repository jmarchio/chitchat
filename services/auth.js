/**
 * Created by Juan on 03/12/2016.
 */
var redis   = require("redis");
var client  = redis.createClient();


/**
 * Creates new key in username
 * @param value {string} User's nickname. Must be unique.
 * @return boolean
 */
exports.create = function(value) {
    var time = new Date().getTime();
    var rs = client.HMSET('username:'+ value, ['status', 'available1', 't', time], redis.print );

    return  rs;
}
