﻿using Microsoft.AspNet.Mvc;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PlanningPoker.Controllers
{
    public class PokerController : Controller
    {
        // GET: /Poker/
        public IActionResult Index()
        {
            return View();
        }
    }
}
