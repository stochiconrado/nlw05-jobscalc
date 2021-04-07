const Profile = require("../model/Profile")

module.exports = {
  async index(req, res){
    {
      return res.render("profile", { profile: await Profile.get()});
    }
  },
  async update(req, res){
    //req.body para pegar os dados
    const data = req.body
    //definir quantas semanas tem no ano: 52
    const weeksPerYear = 52
    //remover semanas de férias do ano, para pegar quantas semans tem em um mês
    const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) /12
    //total de horas trabalhadas na semana
    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
    //horas trabalhadas no mês
    const monthlyTotalHours = weekTotalHours * weeksPerMonth
    //Qual é o valor da minha hora?
    const valueHour = data["monthly-budget"] / monthlyTotalHours

    await Profile.update({
      ...await Profile.get(),
      ...req.body,
      "value-hour": valueHour
    })
    return res.redirect('/profile')
  },
}