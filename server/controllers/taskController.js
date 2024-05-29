import Task from '../models/taskModel.js'

// get all task
export const getAllTask = async(req,res) => {
    try {
        const allTask =  await Task.findById(req.user.id);
    
        res.status(200).json({
            success:true,
            message:"All Task",
            allTask
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}


//get task by id
export const getTaskById = async(req,res) => {
    console.log(req.params)
    const {id} = req.params
    try {
        const TaskById =  await Task.find({user_id:id});
    
        res.status(200).json({
            success:true,
            message:"Task Fetched Successfully",
            TaskById
        })
    } catch(err){
        res.status(500).json({
            success:false,
            message:'Internal server error'
        })
    }
}


// to add task
export const addTask  = async(req,res) => {
    console.log(req.body)
try {

    const { title, description, status, dueDate,user_id } = req.body;
    const newTask = new Task({ title, description, status, dueDate,user_id  });
    const addTask = await newTask.save();

    res.status(200).json({
        success:true,
        message:"Task Added",
        addTask
    })
} catch(err){
    res.status(500).json({
        success:false,
        message:'Internal server error'
    })
}
}


//update task by id
export const updateTaskById = async(req,res) => {
    console.log(req.body)
 try{   
    const {id} = req.params;
    const {title, description, status,dueDate} = req.body;
    const updateTask = await Task.findByIdAndUpdate(id,{title, description, status, dueDate });

    res.status(200).json({
        success:true,
        message:"Task Updated",
        updateTask
    })} catch(err) {
    res.status(500).json({
        success:false,
        message:'Internal server error'
    })

    }

}


//delete task by id
export const deleteTaskById = async(req,res) => {
    try{   const {id} = req.params;
       const deletedTask = await Task.findByIdAndDelete(id);
   
       res.status(200).json({
           success:true,
           message:"Task Deleted",
           deletedTask
       })} catch(err) {
       res.status(500).json({
           success:false,
           message:'Internal server error'
       })
   
       }
   
   }