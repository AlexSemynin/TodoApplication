using BusinessLayer;
using DataLayer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : Controller
    {
        DataManager _dataManager;
        RepositoryTodoContext _context;
        public TodosController(DataManager dataManager, RepositoryTodoContext context)
        {
            _dataManager = dataManager;
            _context = context;
        }

        // GET: api/<TodosController>
        [HttpGet]
        [Authorize]
        [Route("getlogin")]
        public IActionResult Get()
        {
            var u = User.Identity.Name;

            return Ok(u);
        }

        // // GET api/<TodosController>/5
        // [HttpGet("{id}")]
        // public string Get(int id)
        // {
        //     return "value";
        // }

        // // POST api/<TodosController>
        // [HttpPost]
        // public void Post([FromBody] string value)
        // {
        // }

        // // PUT api/<TodosController>/5
        // [HttpPut("{id}")]
        // public void Put(int id, [FromBody] string value)
        // {
        // }

        // // DELETE api/<TodosController>/5
        // [HttpDelete("{id}")]
        // public void Delete(int id)
        // {
        // }
    }
}
