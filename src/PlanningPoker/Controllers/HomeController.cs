using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using PlanningPoker.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PlanningPoker.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public IActionResult Index()
        {
            //TODO: if cookie exists, redirect now to poker room
            if (Request.Cookies.Get("pokerUsername") != null)
            {
                return RedirectToAction("Index", "Poker");
            }
            return View();
        }

        [HttpPost]
        public IActionResult Login(JoinRoomModel model)
        {
            // Add user name to cookie, then we can pull the user name from the cookie in SignalR
            Response.Cookies.Append("pokerUsername", model.UserName);
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
