const {
  Campaign,
  Task,
  TaskUsers,
  User,
  TaskProgress,
  TaskProgressEvidence
} = require('../models');
const {
  publicAttr
} = require('../constants/user.constants');

class TaskService {

  static async createCashForWorkTask(tasks, campaignId) {

    // check if campaign exists
    console.log(campaignId, 'campaignId')
    const campaign = await Campaign.findOne({
      where: {
        id: campaignId,
        type: "cash-for-work"
      }
    });

    if (!campaign)
      throw new Error("Invalid campaign id");

    if (campaign.status == "completed")
      throw new Error("Campaign is already completed");

    const _tasks = tasks.map(task => {
      task.CampaignId = campaignId;
      return task;
    });

    return Task.bulkCreate(_tasks);
  }

  static async getCashForWorkTasks(params) {

    return Task.findAndCountAll({
      where: {
        CampaignId: params.campaign_id
      },
      include: [{
        model: TaskUsers,
        as: 'AssociatedWorkers',
        attributes: [],
        include: [{
          model: User,
          as: 'Worker',
          attributes: publicAttr
        }]
      }]
    });
  }

  static async updateTask(id, updateTaskObj) {
    const task = await Task.findByPk(id);
    if (!task)
      throw new Error("Invalid task id");

    return task.update(updateTaskObj);
  }

  static async uploadProgressEvidence(taskProgressId, imageUrl) {
    const taskProgress = await TaskProgress.findByPk(taskProgressId);

    if (!taskProgress) {
      throw new Error("No progress task found");
    } else
      return await TaskProgressEvidence.create({
        TaskProgressId: taskProgressId,
        imageUrl
      });
  }

}

module.exports = TaskService;