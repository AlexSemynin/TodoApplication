using BusinessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer
{
    public class DataManager
    {
        IUsersRepo _userRepo;
        ITodosRepo _todosRepo;
        public DataManager(IUsersRepo usersRepo, ITodosRepo todosRepo)
        {
            _userRepo = usersRepo;
            _todosRepo = todosRepo;
        }

        public IUsersRepo Users => _userRepo;
        public ITodosRepo Todos => _todosRepo;
    }
}
