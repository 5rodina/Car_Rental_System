import { MongoClient } from 'mongodb'

const client =new MongoClient('mongodb://localhost:27017')

client.connect()
      .then(()=>console.log('db connected'))
      .catch((err)=>console.log(err))


const db=client.db('car_rental_system')

export default db