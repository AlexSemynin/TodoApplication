using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface ITodosRepo
    {
        Task<IEnumerable<Todo>> GetTodosByUser(User user);
        Task<IEnumerable<Todo>> GetTodosByUserId(string id);
        Task<Todo> GetTodoById(string id);
        Todo Create(string userId, string text, bool? isComplited);
        void Remove(string todoId);
        void Change(Todo todo);
    }
}
