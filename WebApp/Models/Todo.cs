using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Todo
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public bool IsComplited { get; set; }
    }
}
