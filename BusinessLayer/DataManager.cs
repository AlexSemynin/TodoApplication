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
        ISlovechkosRepo _slovechkosRepo;
        public DataManager(IUsersRepo usersRepo, ITodosRepo todosRepo, ISlovechkosRepo slovechkos)
        {
            _userRepo = usersRepo;
            _todosRepo = todosRepo;
            _slovechkosRepo = slovechkos;
        }

        public IUsersRepo Users => _userRepo;
        public ITodosRepo Todos => _todosRepo;
        public ISlovechkosRepo Slovechkos => _slovechkosRepo;
    }
}
