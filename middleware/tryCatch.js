 const tryCatch =(handler) => {
async (req,res,next) => {
   try {
     handler(req,res,next)
   } catch (error) {
    res.json(error.message)
   }
}
 }


 export default tryCatch