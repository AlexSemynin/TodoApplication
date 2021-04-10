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
        public ActionResult<List<Todo>> Get()
        {
            var userId = User.Identity.Name;
            var todos = _dataManager.Users.GetTodos(userId);

            return Ok(todos);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Todo>> Create([FromBody] WebApp.Models.Todo todo)
        {
            if (todo == null)
            {
                return BadRequest();
            }

            //var user = _dataManager.Users.GetUserById(User.Identity.Name);
            var userId = User.Identity.Name;

            var newTodo = _dataManager.Todos.Create(userId, todo.Text, todo.IsComplited);



            //_dbContext.Todos.Update(todo);
            //await _dbContext.SaveChangesAsync();
            return Ok(newTodo);
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<Todo>> Put([FromBody] Models.Todo todo)
        {
            var newTodo = await _dataManager.Todos.GetTodoById(todo.Id);
            if (newTodo is null)
            {
                return BadRequest("todo is null");
            }
            newTodo.Text = todo.Text;
            newTodo.IsComplited = todo.IsComplited;
            _context.Todos.Update(newTodo);
            await _context.SaveChangesAsync();
            return Ok(newTodo);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult Delete(string id)
        {
            try
            {
                _dataManager.Todos.Remove(id);
                return Ok();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
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
