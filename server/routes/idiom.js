import express from 'express';
import Idiom from '../models/idiom';
import mongoose from 'mongoose';

const router = express.Router();

/*
 WRITE Idiom: POST /api/idiom
 ERROR CODES
 1: NOT LOGGED IN
 2: EMPTY CONTENTS
 */
router.post('/', (req, res) =>{
    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(403).json({
            error : "NOT LOGGED IN",
            code : 1
        });
    }

    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string'){
        return res.status(400).json({
            error : "EMPTY CONTENTS",
            code : 2
        });
    }

    if(req.body.contents === ""){
        return res.status(400).json({
            error : "EMPTY CONTENTS",
            code : 2
        });
    }

    // CREATE NEW Idiom
    let idiom = new Idiom({
        writer : req.session.loginInfo.username,
        contents : req.body.contents,
        means : req.body.means,
        examples : req.body.examples,
        importance : 1
    });

    // SAVE IN DATABASE
    idiom.save(err =>{
        if(err) throw err;
        return res.json({success : true});
    });
});

/*
 MODIFY Idiom: PUT /api/idiom/:id
 ERROR CODES
 1: INVALID ID,
 2: EMPTY CONTENTS
 3: NOT LOGGED IN
 4: NO RESOURCE
 5: PERMISSION FAILURE
 */
router.put('/:id', (req, res) =>{

    // CHECK Idiom ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            error : "INVALID ID",
            code : 1
        });
    }

    // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string'){
        return res.status(400).json({
            error : "EMPTY CONTENTS",
            code : 2
        });
    }

    if(req.body.contents === ""){
        return res.status(400).json({
            error : "EMPTY CONTENTS",
            code : 2
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(403).json({
            error : "NOT LOGGED IN",
            code : 3
        });
    }

    // FIND Idiom
    Idiom.findById(req.params.id, (err, idiom) =>{
        if(err) throw err;

        // IF Idiom DOES NOT EXIST
        if(!idiom){
            return res.status(404).json({
                error : "NO RESOURCE",
                code : 4
            });
        }

        // IF EXISTS, CHECK WRITER
        if(idiom.writer != req.session.loginInfo.username){
            return res.status(403).json({
                error : "PERMISSION FAILURE",
                code : 5
            });
        }

        // MODIFY AND SAVE IN DATABASE
        idiom.contents = req.body.contents;
        idiom.means = req.body.means;
        idiom.examples = req.body.examples;
        idiom.date.edited = new Date();
        idiom.is_edited = true;

        idiom.save((err, idiom) =>{
            if(err) throw err;
            return res.json({
                success : true,
                idiom
            });
        });

    });
});

/*
 DELETE Idiom: DELETE /api/idiom/:id
 ERROR CODES
 1: INVALID ID
 2: NOT LOGGED IN
 3: NO RESOURCE
 4: PERMISSION FAILURE
 */
router.delete('/:id', (req, res) =>{

    // CHECK Idiom ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            error : "INVALID ID",
            code : 1
        });
    }

    // CHECK LOGIN STATUS
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(403).json({
            error : "NOT LOGGED IN",
            code : 2
        });
    }

    // FIND Idiom AND CHECK FOR WRITER
    Idiom.findById(req.params.id, (err, idiom) =>{
        if(err) throw err;

        if(!idiom){
            return res.status(404).json({
                error : "NO RESOURCE",
                code : 3
            });
        }
        if(idiom.writer != req.session.loginInfo.username){
            return res.status(403).json({
                error : "PERMISSION FAILURE",
                code : 4
            });
        }

        // REMOVE THE Idiom
        Idiom.remove({_id : req.params.id}, err =>{
            if(err) throw err;
            res.json({success : true});
        });
    });

});

/*
 READ Idiom: GET /api/idiom
 */
router.get('/', (req, res) =>{
    Idiom.find()
        .sort({"_id" : -1})
        .limit(6)
        .exec((err, idioms) =>{
            if(err) throw err;
            res.json(idioms);
        });
});

/*
 READ ADDITIONAL (OLD/NEW) Idiom: GET /api/idiom/:listType/:id
 */
router.get('/:listType/:id', (req, res) =>{
    let listType = req.params.listType;
    let id = req.params.id;

    // CHECK LIST TYPE VALIDITY
    if(listType !== 'old' && listType !== 'new'){
        return res.status(400).json({
            error : "INVALID LISTTYPE",
            code : 1
        });
    }

    // CHECK Idiom ID VALIDITY
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({
            error : "INVALID ID",
            code : 2
        });
    }

    let objId = new mongoose.Types.ObjectId(req.params.id);

    if(listType === 'new'){
        // GET NEWER Idiom
        Idiom.find({_id : {$gt : objId}})
            .sort({_id : -1})
            .limit(6)
            .exec((err, idioms) =>{
                if(err) throw err;
                return res.json(idioms);
            });
    }else{
        // GET OLDER Idiom
        Idiom.find({_id : {$lt : objId}})
            .sort({_id : -1})
            .limit(6)
            .exec((err, idioms) =>{
                if(err) throw err;
                return res.json(idioms);
            });
    }
});

export default router;