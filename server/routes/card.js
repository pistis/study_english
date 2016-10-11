import express from 'express';
import Card from '../models/card';
import mongoose from 'mongoose';

const router = express.Router();

/*
 WRITE Card: POST /api/card
 ERROR CODES
 1: NOT LOGGED IN
 2: EMPTY CONTENTS
 */
router.post('/', (req, res) =>{
    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string'){
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.contents === ""){
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CREATE NEW Card
    let card = new Card({
        writer: req.session.loginInfo.username,
        contents: req.body.contents,
        means: req.body.means,
        examples: req.body.examples,
        importance: 1,
        view_count: 0
    });

    // SAVE IN DATABASE
    card.save(err =>{
        if(err) throw err;
        return res.json({success: true});
    });
});

/*
 MODIFY Card: PUT /api/card/:id
 ERROR CODES
 1: INVALID ID,
 2: EMPTY CONTENTS
 3: NOT LOGGED IN
 4: NO RESOURCE
 5: PERMISSION FAILURE
 */
router.put('/:id', (req, res) =>{

    // CHECK Card ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string'){
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.contents === ""){
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        });
    }

    // FIND Card
    Card.findById(req.params.id, (err, card) =>{
        if(err) throw err;

        // IF Card DOES NOT EXIST
        if(!card){
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            });
        }

        // IF EXISTS, CHECK WRITER
        if(card.writer != req.session.loginInfo.username){
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 5
            });
        }

        // MODIFY AND SAVE IN DATABASE
        card.contents = req.body.contents;
        card.means = req.body.means;
        card.examples = req.body.examples;
        card.date.edited = new Date();
        card.is_edited = true;

        card.save((err, card) =>{
            if(err) throw err;
            return res.json({
                success: true,
                card
            });
        });

    });
});

/*
 DELETE Card: DELETE /api/card/:id
 ERROR CODES
 1: INVALID ID
 2: NOT LOGGED IN
 3: NO RESOURCE
 4: PERMISSION FAILURE
 */
router.delete('/:id', (req, res) =>{

    // CHECK Card ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        });
    }

    // FIND Card AND CHECK FOR WRITER
    Card.findById(req.params.id, (err, card) =>{
        if(err) throw err;

        if(!card){
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            });
        }
        if(card.writer != req.session.loginInfo.username){
            return res.status(403).json({
                error: "PERMISSION FAILURE",
                code: 4
            });
        }

        // REMOVE THE Card
        Card.remove({_id: req.params.id}, err =>{
            if(err) throw err;
            res.json({success: true});
        });
    });

});

/*
 READ Card: GET /api/card
 */
router.get('/', (req, res) =>{
    Card.find()
        .sort({"_id": -1})
        //.limit(6)
        .exec((err, cards) =>{
            if(err) throw err;
            res.json(cards);
        });
});

/*
 READ ADDITIONAL (OLD/NEW) Card: GET /api/card/:listType/:id
 */
router.get('/:listType/:id', (req, res) =>{
    let listType = req.params.listType;
    let id = req.params.id;

    // CHECK LIST TYPE VALIDITY
    if(listType !== 'old' && listType !== 'new'){
        return res.status(400).json({
            error: "INVALID LISTTYPE",
            code: 1
        });
    }

    // CHECK Card ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            error: "INVALID ID",
            code: 2
        });
    }

    let objId = new mongoose.Types.ObjectId(req.params.id);

    if(listType === 'new'){
        // GET NEWER Card
        Card.find({_id: {$gt: objId}})
            .sort({_id: -1})
            //.limit(6)
            .exec((err, cards) =>{
                if(err) throw err;
                return res.json(cards);
            });
    }else{
        // GET OLDER Card
        Card.find({_id: {$lt: objId}})
            .sort({_id: -1})
            //.limit(6)
            .exec((err, cards) =>{
                if(err) throw err;
                return res.json(cards);
            });
    }
});

export default router;