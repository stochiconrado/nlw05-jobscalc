const Job = require("../model/Job");
const Profile = require("../model/Profile");
const JobUtils = require("../utils/JobUtils")

module.exports = {
  index(req, res) {
    const jobs = Job.get();
    const profiles = Profile.get();

    let statusCount = {
      progress: 0,
      done: 0,
      total: jobs.length,
    }

    //total de horas/dia de job inProgress
    let jobTotalHours = 0;

    const updateJobs = jobs.map((job) => {
      //ajustes no job
      const remaining = JobUtils.remaningDays(job);
      const status = remaining <= 0 ? "done" : "progress";
      //somando a quantidade de status
      statusCount[status] += 1 

    //total de horas/dia de job inProgress
    jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours
    
      return {
        ...job,
        remaining,
        status,
        budget: JobUtils.calculateBudget(job, profiles["value-hour"]),
      };
    });

    //QTD de horas à trabalho(PROFILE) - QTD de horas/dia de cada job inProgress
    let freeHours = profiles["hours-per-day"] - jobTotalHours;
        
    return res.render("index", { jobs: updateJobs, profiles: profiles, statusCount:statusCount, freeHours:freeHours });
  },
};
