using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interfaces
{
    public interface ISlovechkosRepo
    {
        Task<Slovechko> CreateSlovo(string content, string autor);
        Slovechko GetRandomSlovechko();


    }
}
