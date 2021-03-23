﻿using DataLayer;
using Microsoft.EntityFrameworkCore;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BusinessLayer.Interfaces;

namespace BusinessLayer.Implements
{
    class EFUsersRepository : IUsersRepo
    {
        RepositoryTodoContext _dbContext;

        public EFUsersRepository(RepositoryTodoContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> CreateUser(string email, string password, string name = "")
        {
            User user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user is null)
            {
                string guid = Guid.NewGuid().ToString().Replace("-", "_");
                string userName = string.IsNullOrEmpty(name) ? email : name;
                user = new User
                {
                    Email = email,
                    Password = password,
                    Id = "user_" + guid,
                    Name = userName,
                    RegisterDate = DateTime.Now
                };
                _dbContext.Add(user);
                await _dbContext.SaveChangesAsync();
                return user;
            }
            return null;
        }

        public User GetUserById(string userId)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Id == userId);
        }

        public User GetRegisterUser(string email, string password)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Email == email && u.Password == password);
        }
    }
}