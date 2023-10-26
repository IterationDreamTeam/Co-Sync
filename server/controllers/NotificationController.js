const Notification = require('../models/notificationModel');

const NotificationController = {

  getNotifications: async (req, res, next) => { 
    try {
      console.log('getNotifications');
      console.log(req.cookies)
      const { ssid: userId } = req.cookies;

      const userNotifications = await Notification.find({ userId }).sort({ createdAt: -1 }).lean();

      console.log(userNotifications); 

      res.locals.notifications = userNotifications;

      next()
      
    } catch (error) {
      return next({
        log: 'NotificationController.getNotifications',
        status: error.status || 500,
        message: error.message || { err: 'Unknown error' }
      })
    }
  },
  markAsRead: async (req, res, next) => {
    try {
      console.log('markAsRead');
      const { params: { id }, body: { isRead } } = req;
      console.log(id, isRead)
      const updatedNotification = await Notification.findOneAndUpdate({ _id: id }, { isRead }, { new: true });
      console.log(updatedNotification);

      next();

    } catch (error) {
      console.log(error);
    }
  }, 
  markAllAsRead: async (req, res, next) => {
    try {
      console.log('markAllAsRead');
      const { ids, patch: {isRead} } = req.body;
      console.log(ids, isRead);

      const updatedNotifications = await Notification.updateMany({ _id: { $in: ids } }, { isRead }, { new: true });
      console.log(updatedNotifications)
      next();
      
    } catch(error) {
      return next({
        log: 'NotificationController.markAllAsRead',
        status: 500,
        message: { err: 'Unknown error' }
      
      })
    }
  }
}; 

module.exports = NotificationController;