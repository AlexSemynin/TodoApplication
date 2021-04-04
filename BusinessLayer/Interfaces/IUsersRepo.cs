using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface IUsersRepo
    {
        Task<User> CreateUser(string email, string password, string name);
        User GetUserById(string userId);
        User GetRegisterUser(string email, string password);

        Task<User> SaveUser(string email, string password, string name);
    }
}
