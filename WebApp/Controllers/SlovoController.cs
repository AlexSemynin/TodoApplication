using BusinessLayer;
using DataLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlovoController : Controller
    {
        DataManager _dataManager;
        RepositoryTodoContext _context;
        public SlovoController(DataManager dataManager, RepositoryTodoContext context)
        {
            _dataManager = dataManager;
            _context = context;
        }

        // GET: api/<SlovoController>
        [HttpGet]
        public ActionResult<Slovechko> Get()
        {
            var slovo = _dataManager.Slovechkos.GetRandomSlovechko();
            return Ok(slovo);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Slovechko>> Create([FromBody] WebApp.Models.Slovechko req)
        {
            if (User.Identity.Name != "1") //todo переделать под роли(пока проверяется по id админa)
            {
                return BadRequest("only admin can create");
            }

            var slovo = await _dataManager.Slovechkos.CreateSlovo(req.Content, req.Author);

            return Ok(slovo);
        }

    }
}
