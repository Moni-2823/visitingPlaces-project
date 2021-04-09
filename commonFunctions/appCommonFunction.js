var badRequestForSaving = (res, doc) => {
    if(!doc) {
        return res.status(404).send({msg: 'bad request'});
    }
}

var badRequestForFind = (res, doc) => {
    if(!doc.length) {
        return res.status(404).send({msg: 'bad requests'});
    }
}

var badRequestForUpdate = (res, doc) => {
    if(!doc) {
        return res.status(404).send({msg: 'bad request'});
    }
}

var badRequestForDelete = (res, doc) => {
    if(!doc) {
        return res.status(404).send({msg: 'bad request'});
    }
}

var errorMsg = (res) => {
    res.status(400).send({msg: 'error found'});
}


module.exports = { badRequestForFind, badRequestForSaving , errorMsg , badRequestForUpdate, badRequestForDelete}