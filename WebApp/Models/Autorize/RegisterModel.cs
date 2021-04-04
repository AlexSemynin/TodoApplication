using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models.Autorize
{
    public class RegisterModel : AutorizeModel
    {
        public string Name { get; set; }
    }
}
