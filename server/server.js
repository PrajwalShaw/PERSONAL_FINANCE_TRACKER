import index from "./index.js";

index.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})