using BusinessLayer;
using DataLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        DataManager _dataManager;
        RepositoryTodoContext _dbContext;
        User _user;
        public AccountController(DataManager dataManager, RepositoryTodoContext dbContext)
        {
            _dataManager = dataManager;
            _dbContext = dbContext;
        }


        [Route("token")]
        [HttpPost]
        public async Task<IActionResult> Token([FromBody] Models.Autorize.AutorizeModel model)
        {
            var identity = await GetIdentity(model.Email, model.Password);
            if (identity == null)
            {
                return Unauthorized(new { errorText = "Invalid username or password." });
            }

            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                email = identity.Name,
                userId = _user.Id
            };

            return Ok(response);
        }
        private async Task<ClaimsIdentity> GetIdentity(string email, string password)
        {
            User person = _dataManager.Users.GetRegisterUser(email, password);
            _user = person;
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Email)
                };
                ClaimsIdentity claimsIdentity =
                new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                    ClaimsIdentity.DefaultRoleClaimType);
                return claimsIdentity;
            }

            // если пользователя не найдено
            return null;
        }

        [Route("register")]
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Register([FromBody] Models.Autorize.RegisterModel model)
        {
            //if (ModelState.IsValid)
            //{


            User user = _dbContext.Users.FirstOrDefault(u => u.Email == model.Email);
            if (user == null)
            {
                // добавляем пользователя в бд
                user = await _dataManager.Users.SaveUser(model.Email, model.Password, model.Name);

                //await Authenticate(user);
                await GetIdentity(user.Email, user.Password);

                return Ok();
            }
            else
            {
                return Unauthorized(new { errorText = "Пользователь уже существует" });
            }
            //}
            //return View(model);
        }
    }
}
