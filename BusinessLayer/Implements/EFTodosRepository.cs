using BusinessLayer.Interfaces;
using DataLayer;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Implements
{
    public class EFTodosRepository : ITodosRepo
    {
        RepositoryTodoContext _dbContext;
        public EFTodosRepository(RepositoryTodoContext context)
        {
            _dbContext = context;
        }

        public async Task<IEnumerable<Todo>> GetTodosByUserId(string id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Id == id);
            var userTodos = user.Todos;

            return userTodos;

        }

        public async Task<IEnumerable<Todo>> GetTodosByUser(User user)
        {
            return await (GetTodosByUserId(user.Id));
        }

        public async Task<Todo> GetTodoById(string id)
        {
            var todo = await _dbContext.Todos.FirstOrDefaultAsync(t => t.Id == id);
            return todo;
        }

        public Todo Create(string userId, string text, bool? isComplited)
        {

            User user = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
            if(user is null)
            {
                throw new Exception("User not found");
            }

            string guid = Guid.NewGuid().ToString().Replace("-", "_");
            bool _isComplited = isComplited ?? false;
            var todo = new Todo
            {
                Id = $"todo_{guid}",
                IsComplited = _isComplited,
                UserId = userId,
                Text = text
            };

            _dbContext.Todos.Add(todo);
            _dbContext.SaveChanges();
            return todo;

        }
        public void Remove(string id)
        {
            var todo = _dbContext.Todos.FirstOrDefault(t => t.Id == id);
            if (todo != null)
            {
                _dbContext.Todos.Remove(todo);
                _dbContext.SaveChanges();
            }
            else
            {
                throw new Exception("такого тодо нет(:");
            }
        }
        public void Change(Todo todo)
        {
            _dbContext.Todos.Update(todo);
            _dbContext.SaveChangesAsync();
        }
    }
}
