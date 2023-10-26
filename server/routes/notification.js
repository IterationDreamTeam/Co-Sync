const express = require('express');
const Router = express.Router();
const NotificationController = require('../controllers/NotificationController');

Router.get('/', NotificationController.getNotifications, (req, res) => {
  return res.status(200).json(res.locals.notifications);
}); 

Router.patch('/:id/read', NotificationController.markAsRead, (req, res) => { 
  return res.status(200).json('Notification Read')
})

Router.patch('/readAll', NotificationController.markAllAsRead, (req, res) => { 
  return res.status(200).json('All Notifications Read')
}); 

module.exports = Router;