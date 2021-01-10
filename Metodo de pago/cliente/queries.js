const Pool = require('pg').Pool

const pool = new Pool({
    host: 'ec2-184-73-176-11.compute-1.amazonaws.com',
    user: 'jitchxyszjccle',
    password: '98946f13f15af93a14307748753834c0d6f59779aca767368637d9c6af010c69',
    database: 'd8dlfmqgaa2m2a',
    port: 5432,
    ssl: true
})

const getTickets = async (request, response) => {
    await pool.query('SELECT * FROM tickets  ORDER BY id ASC ',(error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({tickets:results.rows});
    })
}

const getTicketById =async (request, response) => {
    const id = parseInt(request.params.id)
    await pool.query('SELECT * FROM  tickets WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({ticket:results.rows});
    })
}

const createTicket=async (request, response) => {
    const data= request.body
    await pool.query('INSERT INTO tickets (type_ticket,class_bus,deperture_date,deperture_time,deperture_place,destination_place,return_date,id_client ) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *',
    [data.type_ticket,data.class_bus,data.deperture_date,data.deperture_time,data.deperture_place,data.destination_place,data.return_date,data.id_client], 
    (error, results) => {
      if (error) {
          throw error
        }
        response.status(201).json({ticket:results.rows[0]});
    })
}

const updateTicket =async (request, response) => {
    const id = parseInt(request.params.id)
    const data = request.body;
    console.log("type "+data.type_ticket+" clase "+data.class_bus);
    await pool.query(
      'UPDATE tickets SET type_ticket = $1, class_bus = $2 WHERE id = $3',
      [data.type_ticket,data.class_bus,id],
      (error, results) => {
        if (error) {
          throw error
        }
        var ticket=({
            type_ticket:data.type_ticket,
            class_bus:data.class_bus,
        })
        response.status(200).json({ticket});
      }
    )
  }

const deleteTicket=async(request, response) => {
    const id = parseInt(request.params.id)
    await pool.query('DELETE FROM tickets WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json({message:`ticket deleted with ID: ${id}`});
    })
  }

const getClients = async (request, response) => {
    await pool.query('SELECT * FROM clients ORDER BY id ASC ',(error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json({clients:results.rows});
    })
}

const getClientAndHisTickets =async (request, response) => {
  const id = parseInt(request.params.id)
  await pool.query('select * from  clients inner join tickets on clients.id = tickets.id_client WHERE  clients.id=$1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({ticket:results.rows});
  })
}


const createClient=async (request, response) => {
    const data= request.body
    await pool.query('INSERT INTO clients (name_user,email,payment_method,seat,total)VALUES($1,$2,$3,$4,$5) RETURNING *',
    [data.name_user,data.email,data.payment_method,data.seat,data.total],
    (error, result) => {
      if (error) {
          throw error
        }
       response.status(200).json({client:result.rows[0]});
    })
}

const getClientById =async (request, response) => {
  const id = parseInt(request.params.id)
  await pool.query('SELECT * FROM  clients WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json({ticket:results.rows});
  })
}


module.exports = {
    getTickets,
    getTicketById,
    createTicket,
    deleteTicket,
    updateTicket,
    getClients,
    createClient,
    getClientAndHisTickets,
    getClientById,
  
}