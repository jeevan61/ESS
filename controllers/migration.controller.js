exports.uploadEmployees = async(req,res) => {
    try{
        
        if(!req.file){
            return res.status(400).json({
                success : false,
                
                message : "No file uploaded"
            });
        }

        return res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            fileInfo : req.file
        });
    }
    catch(err){
        return res.status(500).json({
            success : false,
            message : err.message
        });
    }
};