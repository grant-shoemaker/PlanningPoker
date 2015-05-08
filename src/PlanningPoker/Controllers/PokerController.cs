using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;

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

        // GET: /Poker/Room/{id}
        [HttpGet("/Poker/Room/{id}")]
        public IActionResult Room(string id)
        {
            if (String.IsNullOrEmpty(id))
                return HttpNotFound();

            ViewBag.roomId = id;
            return View();
        }
    }
}
