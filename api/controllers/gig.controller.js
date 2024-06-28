import createError from "../utils/createError.js";
import Gig from '../models/gig.model.js';

export const createGig = async (req, res, next) => {
    if (!req.isSeller) {
        return next(createError(403, 'Only sellers can create a gig'));
    }

    const gig = new Gig({
        userId: req.userId,
        ...req.body,
    });
    console.log("gig is not saved");
    console.log(gig);
    try {
        const newGig = await gig.save();
        console.log("gig is saved");
        console.log(newGig);
        res.status(201).json(newGig);
    } catch (error) {
        next(error);
    }
};

export const deleteGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (gig.userId !== req.userId)
            return next(createError(403, "You can delete only your gig!"));

        await Gig.findByIdAndDelete(req.params.id);
        res.status(200).send("Gig has been deleted!");
    } catch (error) {
        next(error);
    }
};

export const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) {
            return next(createError(404, "Gig not found"));
        }
        res.status(200).json(gig);
    } catch (error) {
        next(error);
    }
};

export const getGigs = async (req, res, next) => {
    const q = req.query;
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { cat: q.cat }),
        ...((q.min || q.max) && {
            price: {
                ...(q.min && { $gt: q.min }),
                ...(q.max && { $lt: q.max }),
            },
        }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    };
    try {
        const gigs = await Gig.find(filters).sort({ [q.sort]: -1 });
        res.status(200).send(gigs);
    } catch (err) {
        next(err);
    }
};


export const deleteAllGigs = async (req, res, next) => {
    try {
        // Delete all gigs in the database
        console.log("ih")
        await Gig.deleteMany({});

        res.status(200).send("All gigs have been deleted!");
    } catch (error) {
        next(error);
    }
};