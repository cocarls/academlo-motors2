import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateRepairs } from './repair.schema.js';
import { RepairService } from './repairs.service.js';

export const findAllRepairs = catchAsync(async (req, res, next) => {
  const repairs = await RepairService.findAll();
 //console.log(repairs);
  return res.status(200).json(repairs);
});

export const createRepair = catchAsync(async (req, res, next) => {
  const {hasError, errorMessages, repairsData}= validateRepairs(req.body)

  

  if(hasError){
    return res.status(422).json({
      status: 'error',
      mesage: errorMessages
    })
  }

  const repairs = await RepairService.create(repairsData)
  return res.status(201).json({
    repairs:{
      date: repairs.date,
      motorsNumber: repairs.motorsNumber,
      description: repairs.description,
      userId: repairs.userId
    }
  })

});

// const { date, userId } = req.body;

//   const repair = await RepairService.create({ date, userId });

//   return res.status(201).json(repair);

export const findOneRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await RepairService.findOne(id);

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'repair not found',
    });
  }

  return res.status(200).json(repair);
});

export const updateRepair = catchAsync(async (req, res, next) => {
  
  const { id } = req.params;

    const repair = await RepairService.findOne(id);

    if(!repair){
      return res.status(404).json({
        status: 'error',
        message: 'repair not found'
      })
    }

    const repairUpdated = await RepairService.update(repair)

    return res.status(200).json(repairUpdated)
  

  // const repairUpdated = await RepairService.update(repair);//repair

  // return res.status(200).json(repairUpdated);
});


export const deleteRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await RepairService.findOne(id, ['pending', 'completed']);

  if (repair?.status === 'completed') {
    return res.status(400).json({
      status: 'error',
      message: 'the repair has been already completed',
    });
  }

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: 'repair not found',
    });
  }

  await RepairService.delete(repair);

  return res.status(204).json(null);
});
