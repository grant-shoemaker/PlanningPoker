using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using PlanningPoker.Models;
using System.Security.Principal;
using System.Security.Claims;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PlanningPoker.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(JoinRoomModel model)
        {
            if (ModelState.IsValid)
            {
                return RedirectToAction("Index", "Poker");
            } else
            {
                ModelState.AddModelError(string.Empty, "Invalid model.");
                return View(model);
            }
        }
    }
}
