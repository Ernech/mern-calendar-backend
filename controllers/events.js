const { request, response } = require('express');
const Event = require('../models/Event');


const getEvents = async (req = request, res = response) => {
    try {
        const events = await Event.find()
                .populate('user','name');
        res.status(200).json({ ok: true, events });
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please, talk with the admin'
        });
    }

}

const createEvent = async (req = request, res = response) => {

    const event = new Event(req.body);

    try {
        event.user = req.uid;
        await event.save();
        res.status(201).json({ ok: true, event });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please, talk with the admin'
        });
    }
}


const updateEvent = async (req = request, res = response) => {
    const { id } = req.params;
    const uid = req.uid;
    try {
        const event = await Event.findById(id);
        if(!event){
            return res.status(404).json({ ok: false, msg: `The event with the id ${id} does not exists`});
        }

        if(event.user.toString() !==uid){
            return res.status(401).json({ok:false, msg:'You dont have permission to update this event'});
        }
        const newEvent = {...req.body,user:uid};
        const updatedEvent = await Event.findByIdAndUpdate(id,newEvent,{new:true});
        res.status(201).json({ ok: true, event:updatedEvent });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please, talk with the admin'
        });

    }
}

const deleteEvent = async (req = request, res = response) => {
    const { id } = req.params;
    const uid = req.uid;
    try {
        const event = await Event.findById(id);
        if(!event){
            return res.status(404).json({ ok: false, msg: `The event with the id ${id} does not exists`});
        }

        if(event.user.toString() !==uid){
            return res.status(401).json({ok:false, msg:'You dont have permission to delete this event'});
        }

        await Event.findByIdAndDelete(id);
        res.status(200).json({ok:true, msg:`The event with the id ${id} has been deleted`});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Please, talk with the admin'
        });
     
    }
    
   
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}