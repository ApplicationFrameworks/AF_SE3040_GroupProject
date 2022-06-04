const GroupRouter=require("express").Router();
const { groupRegistration, updateGroup,  deleteGroup } =require('../controllers/groupcontroller.js');
const { fetchAll, fetchOne} =require('../controllers/groupcontroller.js');

GroupRouter.post('/addG',groupRegistration);

GroupRouter.put('/groups/update/:id',updateGroup);

GroupRouter.delete('/groups/delete/:id', deleteGroup);

GroupRouter.get('/',fetchAll);

GroupRouter.get('/groups/:id',fetchOne);

module.exports = GroupRouter;