import ErrorHandler from "../middlewares/error.js";
import { Note } from "../models/noteModel.js";

export const newNote = async(req, res, next)=>{
  try {
    const {title, description} = req.body;
    await Note.create({
      title,
      description,
      user: req.user,
    });
    res.status(201).json({
      success : true,
      message : "note created"
    });
  } catch (error) {
      next(error);  
  }
}



export const getMyNotes = async(req,res, next)=>{
  try {
    const userid = req.user._id;
    const notes = await Note.find({user: userid});

    res.status(200).json({
      success: true,
      notes,
  });
  } catch (error) {
      next(error);  
  }
}



export const updateNote = async(req,res,next)=>{
  try {
    const {title, description} = req.body;
    const note = await Note.findById(req.params.id);

    if (!note) return next(new ErrorHandler("Note not found",404));

    note.title = title;
    note.description = description;

    await note.save();

    res.status(200).json({
      success: true,
      message: "Note Updated!",
    });
  } catch (error) {
      next(error);
  }
}



export const deleteNote = async(req,res,next)=>{
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return next(new Error("Note not found",404));

    await note.deleteOne();
    res.status(200).json({
      success: true,
      message: "Note Deleted!"
    });
  } catch (error) {
      next(error);  
  }
}