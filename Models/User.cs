using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    public class User
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }

        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        public string Password { get; set; }

        public List<Todo> Todos { get; set; }

        public DateTime? RegisterDate { get; set; }
        public bool IsAdmin { get => false; private set { } }

    }
}
