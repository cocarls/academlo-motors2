import { AppError } from "../../common/errors/appErrors.js";
import { catchAsync } from "../../common/errors/catchAsync.js";
import { RepairService } from "./repairs.service.js";



export const validateExistRepairs = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const repairs = await RepairService.findOne(id);
  
    if (!repairs) {
      return next(new AppError(`repairs width: ${id} not found`), 404);
    }
  
    req.repairs = repairs;
  
    next();
 });

