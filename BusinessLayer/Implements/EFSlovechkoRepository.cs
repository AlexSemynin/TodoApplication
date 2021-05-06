using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Interfaces;
using DataLayer;
using Models;

namespace BusinessLayer.Implements
{
    public class EFSlovechkoRepository : ISlovechkosRepo
    {
        RepositoryTodoContext _contex;

        public EFSlovechkoRepository(RepositoryTodoContext repositoryTodoContext)
        {
            _contex = repositoryTodoContext;
        }

        public Slovechko GetRandomSlovechko()
        {
            var rand = new Random();
            var list = _contex.Slovechkos.ToList();
            return list[rand.Next(0, list.Count)];
        }

        public async Task<Slovechko> CreateSlovo(string content, string autor)
        {
            var guid = Guid.NewGuid().ToString().Replace("-", "_");
            var slovo = new Slovechko() { Id =  $"slovechko_{guid}"};
            slovo.Author = autor;
            slovo.Content = content;
            await _contex.Slovechkos.AddAsync(slovo);
            await _contex.SaveChangesAsync();

            return slovo;
        }
    }
}
