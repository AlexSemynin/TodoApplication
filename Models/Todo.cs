using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class Todo
    {
        [Key]
        public string Id { get; set; }

        public string Text { get; set; }
        public bool IsComplited { get; set; }

        public string UserId { get; set; }
        //public User User { get; set; }
    }
}