const { ObjectId } = require('mongodb')

const getAndValidateObjectId = (body, idName) => {

    const id = body[idName]
    if (!id){
        throw { status: 400, msg: `Unsatisfied: Missing field in request`}
    } else if (!ObjectId.isValid(id)) {
        throw { status: 400, msg: "Bad id" }
    }
    return id
}


const getAndValidateDataBody = (body, requiredField, optionalField, author=null) => {

    let data = {}   // The valid posting data
    // Check every required field is satisfied
    for(let field of requiredField){
        if (!(field in body) || !body[field]){
            throw { status: 400, msg: `Unsatisfied: Missing field [${field}] in request body`}
        } else {
            data[field] = body[field]
        }
    }
    // Fill every optional fields
    for (let field of optionalField){
        if (field in body && body[field] !== '' && body[field] !== null){
            data[field] = body[field]
        }
    }

    // Set the author if there is one field
    if (author){
        data.author = author
    }

    return data

}


module.exports = {
    getAndValidateObjectId,
    getAndValidateDataBody
}