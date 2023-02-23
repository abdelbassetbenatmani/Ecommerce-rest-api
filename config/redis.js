const redis = require('redis');
const logger = require('./logger')

const client = redis.createClient({port:6379,host:"127.0.0.1"});


const redisConnection = ()=>{
    client.connect().then(()=>{
        console.log('client connected');

    }).catch(err=>{logger.error(`check connection db ${err.message}`)});
}
const setRedisToken = (userId,token,expire)=>{
    client.SET(userId,token,{'EX':expire}).then(()=>{console.log('token ok');}).catch(err=>{logger.error('you cant set token to redis')});
}
const getRedisToken = (userId)=>
     new Promise((resolve,reject)=>{
        client.get(userId).then((value)=>{
            resolve(value);
        }).catch((err)=>reject(err))
    })


const deleteRedisToken = (userId)=>client.del(userId).then(()=>{console.log('token deleted');}).catch(err=>{console.log('error deleting');});
module.exports = {redisConnection,setRedisToken,getRedisToken,deleteRedisToken}